import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from 'src/entities'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TokenService } from '../@common/providers/token.service'
import { LocalStrategy } from 'src/global/strategies/local.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('token.secret'),
        signOptions: { expiresIn: cs.get<string>('token.expire') }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, LocalStrategy]
})
export class AuthModule {}
