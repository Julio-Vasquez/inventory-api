import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

import { ROLES } from '../../../global/constants/jwt.constant'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this.reflector.get(ROLES, context.getHandler())

    if (!roles) return true //public

    const request = context.switchToHttp().getRequest()

    if (!request.headers.authorization) return false

    const token: string = request.headers.authorization.split(' ')[1]

    if (!token && token.length === 0) return false

    const jwt = new JwtService()

    const decodeToken = jwt.decode(token)

    console.log(decodeToken)

    return roles.includes(decodeToken.role)
  }
}
