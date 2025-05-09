import { Repository } from 'typeorm'
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateProductDto } from '../dto'
import { ProductsEntity, UserEntity } from 'src/entities'
import { ApiResponse } from 'src/global/interfaces'
import { TokenService } from 'src/modules/@common/providers/token.service'

@Injectable()
export class ProductUpdateService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService
  ) {}

  async update(
    _id: string,
    product: CreateProductDto,
    token: string
  ): Promise<ApiResponse<boolean>> {
    const { email } = this.tokenService.GetInfoToken(token)!

    const user = await this.userRepository.findOneBy({ email })

    if (!user)
      throw new NotFoundException('No existe ningún usuario con ese email')

    const productExists = await this.productsRepository.findOneBy({
      _id,
      status: 'Activo'
    })

    if (!productExists)
      throw new NotFoundException(
        `No se encontró el producto con el id brindado`
      )

    const result = await this.productsRepository.update(
      { _id, status: 'Activo' },
      { ...product, user }
    )

    if (result.affected === 0)
      throw new NotFoundException(
        `No se encontró el producto con el id brindado`
      )

    return {
      message: 'Producto actualizada correctamente',
      statusCode: HttpStatus.OK,
      status: 'success',
      payload: true
    }
  }
}
