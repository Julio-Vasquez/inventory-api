import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CompanyEntity } from 'src/entities'
import { CompanyController } from './company.controller'
import {
  CompanyCreateService,
  CompanyFindServices,
  CompanyRemoveService,
  CompanyUpdateService
} from './services'

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController],
  providers: [
    CompanyCreateService,
    CompanyFindServices,
    CompanyRemoveService,
    CompanyUpdateService
  ]
})
export class CompanyModule {}
