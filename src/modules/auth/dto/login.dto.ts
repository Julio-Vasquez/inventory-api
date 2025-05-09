import { IsEmail, MinLength, IsString } from 'class-validator'

export class LoginDto {
  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(4)
  readonly password: string
}
