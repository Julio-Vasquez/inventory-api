import { registerAs } from '@nestjs/config'

export default registerAs('token', () => ({
  secret: process.env.JWT_KEY,
  expire: process.env.JWT_EXP
}))
