import { Type } from 'class-transformer'
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsArray,
  ValidateNested,
  ArrayNotEmpty
} from 'class-validator'

class PriceByCurrencyDto {
  @IsString()
  @IsNotEmpty()
  moneda: string

  @IsNumber()
  @IsPositive()
  value: number
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  nombre: string

  @IsNumber()
  @IsPositive()
  cantidad: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceByCurrencyDto)
  pricesByCurrency: PriceByCurrencyDto[]

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  characteristics: string[]
}
