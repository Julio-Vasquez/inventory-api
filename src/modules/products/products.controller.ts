import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

@Controller('products')
export class ProductController {
  constructor() {}

  @Get()
  async findAll() {
    return {}
  }

  @Get(':_id')
  async findById(@Param('_id') _id: string) {
    return _id
  }

  @Get('/by-company/:nit')
  async findByCompany(@Param('nit') nit: string) {
    return nit
  }

  @Post()
  async create() {}

  @Put(':_id')
  async update(@Param('_id') _id: string) {
    return _id
  }

  @Delete(':_id')
  async remove(@Param('_id') _id: string) {
    return _id
  }
}
