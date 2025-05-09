import { Request } from 'express'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req
} from '@nestjs/common'

import { CreateProductDto } from './dto'
import { TokenService } from '../@common/providers/token.service'
import {
  ProductCreateService,
  ProductFindsServices,
  ProductRemoveService,
  ProductUpdateService
} from './services'

@Controller('products')
export class ProductController {
  constructor(
    private readonly findService: ProductFindsServices,
    private readonly createService: ProductCreateService,
    private readonly removeService: ProductRemoveService,
    private readonly updateService: ProductUpdateService,
    private readonly tokenService: TokenService
  ) {}

  @Get()
  async findAll() {
    return await this.findService.findAll()
  }

  @Get(':_id')
  async findById(@Param('_id', new ParseUUIDPipe()) _id: string) {
    return await this.findService.findById(_id)
  }

  @Get('by-company/:nit')
  async findByCompany(@Param('nit') nit: string) {
    return await this.findService.findByCompany(nit)
  }

  @Post()
  async create(@Body() product: CreateProductDto, @Req() req: Request) {
    return await this.createService.create(
      product,
      this.tokenService.GetTokenFromRequest(req)!
    )
  }

  @Put(':_id')
  async update(
    @Param('_id', new ParseUUIDPipe()) _id: string,
    @Body() product: CreateProductDto,
    @Req() req: Request
  ) {
    return await this.updateService.update(
      _id,
      product,
      this.tokenService.GetTokenFromRequest(req)!
    )
  }

  @Delete(':_id')
  async remove(@Param('_id', new ParseUUIDPipe()) _id: string) {
    return await this.removeService.remove(_id)
  }
}
