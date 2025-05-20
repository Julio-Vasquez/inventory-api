import { Request } from 'express'
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  Req
} from '@nestjs/common'

import { CreateCompanyDto, NitDto } from './dto'
import { TokenService } from '../@common/providers/token.service'
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
    private readonly updateService: CompanyUpdateService,
    private readonly tokenService: TokenService
  ) {}

  @Get()
  async findAll() {
    return await this.findService.findAll()
  }

  @Get(':nit')
  async findByNit(@Param() nit: NitDto) {
    return await this.findService.findByNit(nit)
  }

  @Post()
  async create(@Body() company: CreateCompanyDto, @Req() req: Request) {
    return await this.createService.create(
      company,
      this.tokenService.GetTokenFromRequest(req)!
    )
  }

  @Delete(':nit')
  async remove(@Param() nit: NitDto) {
    return await this.removeService.remove(nit)
  }

  @Put(':nit')
  async update(
    @Param() nit: NitDto,
    @Body() company: CreateCompanyDto,
    @Req() req: Request
  ) {
    return await this.updateService.update(
      nit,
      company,
      this.tokenService.GetTokenFromRequest(req)!
    )
  }
}
