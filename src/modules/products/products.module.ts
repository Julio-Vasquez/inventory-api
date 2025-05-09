import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductController } from './products.controller'
import { TokenService } from '../@common/providers/token.service'
import { CompanyEntity, ProductsEntity, UserEntity } from 'src/entities'
import {
  ProductCreateService,
  ProductFindsServices,
  ProductRemoveService,
  ProductUpdateService
} from './services'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, CompanyEntity, UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('token.secret'),
        signOptions: { expiresIn: cs.get<string>('token.expire') }
      })
    })
  ],
  controllers: [ProductController],
  providers: [
    ProductFindsServices,
    ProductCreateService,
    ProductRemoveService,
    ProductUpdateService,
    TokenService
  ]
})
export class ProductsModule {}
