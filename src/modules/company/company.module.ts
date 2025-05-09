import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CompanyEntity, UserEntity } from 'src/entities'
import { CompanyController } from './company.controller'
import { TokenService } from '../@common/providers/token.service'
import {
  CompanyCreateService,
  CompanyFindServices,
  CompanyRemoveService,
  CompanyUpdateService
} from './services'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity, UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('token.secret'),
        signOptions: { expiresIn: cs.get<string>('token.expire') }
      })
    })
  ],
  controllers: [CompanyController],
  providers: [
    CompanyCreateService,
    CompanyFindServices,
    CompanyRemoveService,
    CompanyUpdateService,
    TokenService
  ]
})
export class CompanyModule {}
