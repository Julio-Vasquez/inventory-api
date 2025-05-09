import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'

import { ProductsEntity } from 'src/entities'

@Injectable()
export class ProductRemoveService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>
  ) {}

  async remove(_id: string) {
    const product = await this.productsRepository.findOneBy({
      _id,
      status: 'Activo'
    })

    if (!product)
      throw new NotFoundException(
        `No se encontró ningún producto con el id proporcionado`
      )

    const result = await this.productsRepository.update(
      { _id },
      { status: 'Inactivo' }
    )

    if (result.affected === 0)
      throw new NotFoundException(
        `No se elimino ningún producto con el id proporcionado`
      )

    return {
      message: 'producto eliminado correctamente',
      statusCode: HttpStatus.OK,
      status: 'success',
      payload: true
    }
  }
}
