import { Module, Global } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { App, Orm, Token } from './config'
import { RolesGuard, JwtAuthGuard } from './guards'

@Global()
@Module({
  imports: [
    PassportModule,
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
  providers: [
    { provide: 'APP_GUARD', useClass: JwtAuthGuard },
    { provide: 'APP_GUARD', useClass: RolesGuard }
  ],
  exports: []
})
export class CommonModule {}
