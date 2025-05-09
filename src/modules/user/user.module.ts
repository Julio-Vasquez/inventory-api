import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from 'src/entities'
import { UserFindService } from './services'
import { UserController } from './user.controller'
import { JwtStrategy } from 'src/global/strategies/jwt.strategy'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [JwtStrategy, UserFindService]
})
export class UserModule {}
