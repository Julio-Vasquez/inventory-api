import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'

import { InventoryEntity } from 'src/entities'
import { ApiResponse } from 'src/global/interfaces'

@Injectable()
export class InventoryRemoveService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>
  ) {}

  async remove(_id: string): Promise<ApiResponse<boolean>> {
    const inventory = await this.inventoryRepository.findOneBy({
      _id,
      status: 'Activo'
    })

    console.log(inventory)
    if (!inventory)
      throw new NotFoundException(`No se encontró ningún inventario con ese ID`)

    const result = await this.inventoryRepository.update(
      { _id },
      { status: 'Inactivo' }
    )

    if (result.affected === 0)
      throw new NotFoundException(`No se pudo eliminar el registro`)

    return {
      message: 'Inventory eliminado correctamente',
      statusCode: HttpStatus.OK,
      status: 'success',
      payload: true
    }
  }
}
