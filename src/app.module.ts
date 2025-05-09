import { Module } from '@nestjs/common'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { CommonModule } from './modules/@common/common.module'
import { CompanyModule } from './modules/company/company.module'
import { ProductsModule } from './modules/products/products.module'

@Module({
  imports: [CommonModule, CompanyModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
