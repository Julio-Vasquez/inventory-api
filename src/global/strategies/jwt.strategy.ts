// https://docs.nestjs.com/recipes/passport#jwt-functionality

import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { BadRequestException, Injectable } from '@nestjs/common'

import { Token } from 'src/global/interfaces'
import { UserFindService } from 'src/modules/user/services'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserFindService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY!
    })
  }

  async validate({ email }: Token) {
    const user = await this.userService.validateUserJwt(email)

    if (!user) throw new BadRequestException('No existe ese usuario')

    return user
  }
}
