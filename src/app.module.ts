import { Module } from '@nestjs/common'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { CommonModule } from './modules/@common/common.module'
import { CompanyModule } from './modules/company/company.module'
import { ProductsModule } from './modules/products/products.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { InventoryModule } from './modules/inventory/inventory.module'

@Module({
  imports: [
    CommonModule,
    AuthModule,
    CompanyModule,
    ProductsModule,
    UserModule,
    InventoryModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
