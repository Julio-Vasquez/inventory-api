import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

import { CreateCompanyDto } from '../dto'
import { ApiResponse } from 'src/global/interfaces'
import { CompanyEntity, UserEntity } from 'src/entities'
import { TokenService } from 'src/modules/@common/providers/token.service'

@Injectable()
export class CompanyCreateService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService
  ) {}

  async create(
    company: CreateCompanyDto,
    token: string
  ): Promise<ApiResponse<boolean>> {
    const { email } = this.tokenService.GetInfoToken(token)!

    const user = await this.userRepository.findOneBy({ email })

    if (!user)
      throw new NotFoundException('No existe ningún usuario con ese Username')

    const companyExists = await this.companyRepository.findOneBy({
      nit: company.nit
    })

    if (companyExists)
      throw new ConflictException(
        `La compañía con el NIT ${company.nit} ya existe`
      )

    const result = await this.companyRepository.insert({ ...company, user })

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
