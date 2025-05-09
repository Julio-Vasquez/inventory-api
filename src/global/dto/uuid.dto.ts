import { IsNotEmpty, IsUUID, IsString } from 'class-validator'

export class UuidDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  public readonly _id: string
}
