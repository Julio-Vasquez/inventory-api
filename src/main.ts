import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import {
  ExpressAdapter,
  NestExpressApplication
} from '@nestjs/platform-express'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  )

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  await app.listen(process.env.PORT ?? 3000, async () => {
    Logger.debug('Init app ', 'Test')
    Logger.log(`🚀 Running on : ${await app.getUrl()}/ 🚀 `, 'Log-Server')
  })
}

bootstrap()
