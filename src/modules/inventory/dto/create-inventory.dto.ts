import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export class CreateInventoryDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  quantity: number

  @IsNotEmpty()
  @IsString()
  companyId: string

  @IsNotEmpty()
  @IsUUID()
  productId: string
}
