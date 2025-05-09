import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'

import { CreateCompanyDto, NitDto } from '../dto'
import { ApiResponse } from 'src/global/interfaces'
import { CompanyEntity, UserEntity } from 'src/entities'
import { TokenService } from 'src/modules/@common/providers/token.service'

@Injectable()
export class CompanyUpdateService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService
  ) {}

  async update(
    { nit }: NitDto,
    company: CreateCompanyDto,
    token: string
  ): Promise<ApiResponse<boolean>> {
    const { email } = this.tokenService.GetInfoToken(token)!

    const user = await this.userRepository.findOneBy({ email })

    if (!user)
      throw new NotFoundException('No existe ningún usuario con ese email')

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
      { ...company, user }
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
