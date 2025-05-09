import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

@Controller('companies')
export class CompanyController {
  constructor() {}

  @Get()
  async findAll() {
    return { hey: 'hey' }
  }

  @Get(':nit')
  async findByNit(@Param('nit') nit: string) {
    return nit
  }

  @Post()
  async create() {}

  @Put(':nit')
  async update(@Param('nit') nit: string) {
    return nit
  }

  @Delete(':nit')
  async remove(@Param('nit') nit: string) {
    return nit
  }
}
