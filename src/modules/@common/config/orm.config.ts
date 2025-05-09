import { registerAs } from '@nestjs/config'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export default registerAs('typeorm', () => ({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_DEFAULT_SCHEMA,
  synchronize: true,
  logging: true,
  entities: ['dist/entities/**/*.entity.js'],
  ssl: {
    rejectUnauthorized: false
  },

  namingStrategy: new SnakeNamingStrategy()
}))
