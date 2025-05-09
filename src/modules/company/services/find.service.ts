import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'

import { CompanyEntity } from 'src/entities'
import { ApiResponse } from 'src/global/interfaces'
import { NitDto } from '../dto'

@Injectable()
export class CompanyFindServices {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}

  async findAll(): Promise<ApiResponse<CompanyEntity[]>> {
    const companies = await this.companyRepository.findBy({ status: 'Activo' })

    return {
      message: 'OK',
      payload: companies,
      statusCode: HttpStatus.OK,
      status: 'success'
    }
  }

  async findByNit({ nit }: NitDto): Promise<ApiResponse<CompanyEntity>> {
    const company = await this.companyRepository.findOneBy({
      nit,
      status: 'Activo'
    })

    if (!company)
      throw new NotFoundException(`Company with NIT ${nit} not found`)

    return {
      message: 'OK',
      payload: company,
      statusCode: HttpStatus.OK,
      status: 'success'
    }
  }
}
