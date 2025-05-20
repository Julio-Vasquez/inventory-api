import { IsString, IsNotEmpty } from 'class-validator'

export class NitDto {
  @IsString()
  @IsNotEmpty()
  readonly nit: string
}
