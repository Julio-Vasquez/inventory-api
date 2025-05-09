import helmet from 'helmet'
import * as morgan from 'morgan'
import * as compression from 'compression'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import {
  ExpressAdapter,
  NestExpressApplication
} from '@nestjs/platform-express'

import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  )

  const confApp: ConfigService = app.get(ConfigService)

  app.enableCors()
  app.use(helmet())
  app.use(morgan('dev'))
  app.use(compression())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  await app.listen(confApp.get<number>('app.port') || 8080, async () => {
    Logger.debug(`🔥🐱 ${confApp.get<string>('app.name')} 🐱🔥`, 'Log-App')
    Logger.debug(`Server: ${confApp.get<number>('app.host')}`, 'Log-Server')
    Logger.debug(`Port: ${confApp.get<number>('app.port')}`, 'Log-Server')
    Logger.log(`🚀 Running on : ${await app.getUrl()}/ 🚀 `, 'Log-Server')
  })
}

bootstrap()
