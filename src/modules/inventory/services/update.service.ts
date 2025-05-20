import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'

import { CreateInventoryDto } from '../dto'
import { InventoryEntity } from 'src/entities'
import { ApiResponse } from 'src/global/interfaces'

@Injectable()
export class InventoryUpdateService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>
  ) {}

  async update(
    _id: string,
    inventory: CreateInventoryDto
  ): Promise<ApiResponse<boolean>> {
    const inventoryExists = await this.inventoryRepository.findOneBy({
      _id,
      status: 'Activo'
    })

    if (!inventoryExists)
      throw new NotFoundException(
        `No se encontró el inventario con el id brindado`
      )

    const result = await this.inventoryRepository.update(
      { _id, status: 'Activo' },
      { ...inventory }
    )

    if (result.affected === 0)
      throw new NotFoundException(`No se Actualizo el inventario`)

    return {
      message: 'Inventario actualizada correctamente',
      statusCode: HttpStatus.OK,
      status: 'success',
      payload: true
    }
  }
}
