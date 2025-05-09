import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'

import { CreateCompanyDto } from '../dto'
import { CompanyEntity } from 'src/entities'
import { ApiResponse } from 'src/global/interfaces'

@Injectable()
export class CompanyCreateService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}

  async create(company: CreateCompanyDto): Promise<ApiResponse<boolean>> {
    const companyExists = await this.companyRepository.findOneBy({
      nit: company.nit
    })

    if (companyExists)
      throw new ConflictException(
        `La compañía con el NIT ${company.nit} ya existe`
      )

    const result = await this.companyRepository.insert(company)

    if (result.identifiers.length === 0)
      throw new InternalServerErrorException('No se pudo insertar la compañía')

    return {
      message: 'Compañía creada correctamente',
      statusCode: HttpStatus.CREATED,
      status: 'success',
      payload: true
    }
  }
}
