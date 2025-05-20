import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompanyEntity, InventoryEntity, ProductsEntity } from 'src/entities'

import {
  InventoryFindServices,
  InventoryCreateService,
  InventoryRemoveService,
  InventoryUpdateService
} from './services'
import { InventoryController } from './inventory.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryEntity, CompanyEntity, ProductsEntity])
  ],
  controllers: [InventoryController],
  providers: [
    InventoryFindServices,
    InventoryCreateService,
    InventoryRemoveService,
    InventoryUpdateService
  ]
})
export class InventoryModule {}
