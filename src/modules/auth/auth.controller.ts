import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'

import { SignupDto } from './dto'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from '../@common/guards'
import { Admin } from 'src/global/decorator/rol.decorator'
import { PublicRoute } from 'src/global/decorator/public.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Admin()
  async signup(@Body() user: SignupDto) {
    return this.authService.signup(user)
  }

  @Post('login')
  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return req.user
  }
}
