import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'

import { InventoryEntity } from 'src/entities'
import { ApiResponse } from 'src/global/interfaces'

@Injectable()
export class InventoryFindServices {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>
  ) {}

  async findByCompany(
    companyId: string
  ): Promise<ApiResponse<InventoryEntity[]>> {
    const inventories = await this.inventoryRepository.find({
      where: { company: { nit: companyId }, status: 'Activo' },
      select: {
        _id: true,
        status: true,
        quantity: true,
        product: {
          name: true,
          characteristics: true,
          pricesByCurrency: true,
          quantity: true,
          _id: true
        },
        company: {
          nit: true,
          name: true
        }
      },
      relations: ['product', 'company']
    })

    return {
      message: 'OK',
      payload: inventories,
      statusCode: HttpStatus.OK,
      status: 'success'
    }
  }

  async findById(_id: string): Promise<ApiResponse<InventoryEntity>> {
    const result = await this.inventoryRepository.findOneBy({ _id })

    if (!result)
      throw new NotFoundException('No hay registros relacionados a ese NIT')

    return {
      message: 'OK',
      payload: result,
      statusCode: HttpStatus.OK,
      status: 'success'
    }
  }
}
