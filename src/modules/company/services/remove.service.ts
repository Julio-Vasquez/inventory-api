import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'

import { CompanyEntity } from 'src/entities'
import { ApiResponse } from 'src/global/interfaces'
import { NitDto } from '../dto'

@Injectable()
export class CompanyRemoveService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}

  async remove({ nit }: NitDto): Promise<ApiResponse<boolean>> {
    const company = await this.companyRepository.findOneBy({
      nit,
      status: 'Activo'
    })

    if (!company)
      throw new NotFoundException(`No se encontró la compañía con NIT ${nit}`)

    const result = await this.companyRepository.update(
      { nit, status: 'Activo' },
      { status: 'Inactivo' }
    )

    if (result.affected === 0)
      throw new NotFoundException(`No se encontró la compañía con NIT ${nit}`)

    return {
      message: 'Compañía eliminada correctamente',
      statusCode: HttpStatus.OK,
      status: 'success',
      payload: true
    }
  }
}
