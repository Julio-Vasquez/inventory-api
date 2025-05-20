import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put
} from '@nestjs/common'

import { CreateInventoryDto } from './dto'
import {
  InventoryRemoveService,
  InventoryFindServices,
  InventoryUpdateService,
  InventoryCreateService
} from './services'

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly findService: InventoryFindServices,
    private readonly removeService: InventoryRemoveService,
    private readonly updateService: InventoryUpdateService,
    private readonly createService: InventoryCreateService
  ) {}

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.findService.findById(id)
  }

  @Get('company/:company')
  async findByCompany(@Param('company') companyId: string) {
    return await this.findService.findByCompany(companyId)
  }

  @Post()
  async create(@Body() dto: CreateInventoryDto) {
    return await this.createService.create(dto)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CreateInventoryDto) {
    return await this.updateService.update(id, dto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.removeService.remove(id)
  }
}
