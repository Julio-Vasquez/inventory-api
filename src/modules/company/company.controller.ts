import { Controller, Delete, Get, Param, Post, Put, Body } from '@nestjs/common'

import { CreateCompanyDto, NitDto } from './dto'
import {
  CompanyCreateService,
  CompanyFindServices,
  CompanyRemoveService,
  CompanyUpdateService
} from './services'

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly findService: CompanyFindServices,
    private readonly createService: CompanyCreateService,
    private readonly removeService: CompanyRemoveService,
    private readonly updateService: CompanyUpdateService
  ) {}

  @Get()
  async findAll() {
    return await this.findService.findAll()
  }

  @Get(':nit')
  async findByNit(@Param('nit') nit: NitDto) {
    return await this.findService.findByNit(nit)
  }

  @Post()
  async create(@Body() company: CreateCompanyDto) {
    return await this.createService.create(company)
  }

  @Delete(':nit')
  async remove(@Param('nit') nit: NitDto) {
    return await this.removeService.remove(nit)
  }

  @Put(':nit')
  async update(@Param('nit') nit: NitDto, @Body() company: CreateCompanyDto) {
    return await this.updateService.update(nit, company)
  }
}
