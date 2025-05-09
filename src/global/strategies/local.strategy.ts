import { Request } from 'express'
import { Strategy } from 'passport-local'
import { min, max } from 'class-validator'
import { PassportStrategy } from '@nestjs/passport'
import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common'

import { LoginDto } from 'src/modules/auth/dto'
import { AuthService } from 'src/modules/auth/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly logger = new Logger(AuthService.name)

  constructor(private readonly auth: AuthService) {
    super({ passReqToCallback: true, usernameField: 'email' })
  }

  private getResponse(field: string, fieldName: string) {
    const errors = [
      `${fieldName} is invalid`,
      `${fieldName} should not be empty`,
      `${fieldName} be longer than or equal to 4 characters`
    ]

    if (!field) return errors

    const response: string[] = []

    if (!min(field.length, 4)) response.push(errors[1])

    if (!max(field.length, 45)) response.push(errors[2])

    return response
  }

  public async validate(req: Request) {
    const { password, email }: LoginDto = req.body
    this.logger.debug({ email, password })

    const messages: string[] = [
      ...this.getResponse(email, 'email'),
      ...this.getResponse(password, 'password')
    ]

    if (messages.length > 0) throw new BadRequestException(messages)

    const user = await this.auth.login({ email, password })

    if (!user) throw new UnauthorizedException()
    return user
  }
}
