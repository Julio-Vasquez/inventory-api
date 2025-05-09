import { Module, Global } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { App, Orm, Token } from './config'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [App, Token, Orm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => {
        const config = cs.get<TypeOrmModuleOptions>('typeorm')
        if (!config) throw new Error('Database config is missing')
        return config
      }
    })
  ],
  providers: [],
  exports: []
})
export class CommonModule {}
