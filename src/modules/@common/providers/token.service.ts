import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'

import { Token } from 'src/global/interfaces'
import { User } from 'src/modules/auth/auth.interface'

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public async GenerateToken(
    data: Omit<User, 'token'>,
    duration?: string
  ): Promise<string> {
    const config = duration ? { expiresIn: duration } : {}
    return await this.jwtService.signAsync(data, config)
  }

  public ValidateToken(token: string): boolean {
    const valid: Token = this.jwtService.verify(token)
    return Boolean(valid)
  }

  public GetInfoToken(token: string): Token | null {
    return this.jwtService.decode<Token>(token)
  }

  public IsExpireToken(exp: string): boolean {
    return +exp <= Math.round(new Date().getTime() / 1000)
  }

  public GetTokenFromRequest(req: Request): string | undefined {
    const { authorization } = req.headers
    return authorization?.split(' ')?.[1]
  }
}
