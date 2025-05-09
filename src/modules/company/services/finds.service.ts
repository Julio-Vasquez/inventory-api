import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CompanyEntity } from 'src/entities'

@Injectable()
export class CompanyFindsServices {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}

  async findAll() {}

  async findByNit() {}
}
