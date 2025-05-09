import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator'

export class SignupDto {
  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(6)
  readonly password: string

  @IsString()
  @IsNotEmpty()
  readonly name: string
}
