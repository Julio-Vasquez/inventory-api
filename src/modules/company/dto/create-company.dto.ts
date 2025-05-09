import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumberString,
  Length
} from 'class-validator'

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  readonly nit: string

  @IsString()
  @Length(1, 50)
  readonly nombre: string

  @IsString()
  @IsNotEmpty()
  readonly address: string

  @IsNumberString()
  readonly phone: string

  @IsEmail()
  readonly email: string
}
