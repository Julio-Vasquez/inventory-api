import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'

import { CompanyEntity } from 'src/entities'
import { CreateCompanyDto, NitDto } from '../dto'
import { ApiResponse } from 'src/global/interfaces'

@Injectable()
export class CompanyUpdateService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}

  async update(
    { nit }: NitDto,
    company: CreateCompanyDto
  ): Promise<ApiResponse<boolean>> {
    const companyExists = await this.companyRepository.findOneBy({
      nit,
      status: 'Activo'
    })

    if (!companyExists)
      throw new NotFoundException(
        `No se encontró la compañía activa con NIT ${nit}`
      )

    const result = await this.companyRepository.update(
      { nit, status: 'Activo' },
      company
    )

    if (result.affected === 0)
      throw new NotFoundException(
        `No se encontró la compañía activa con NIT ${nit}`
      )

    return {
      message: 'Compañía actualizada correctamente',
      statusCode: HttpStatus.OK,
      status: 'success',
      payload: true
    }
  }
}
