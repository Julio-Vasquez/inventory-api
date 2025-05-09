import { Repository } from 'typeorm'
import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateProductDto } from '../dto'
import { ProductsEntity, UserEntity } from 'src/entities'
import { TokenService } from 'src/modules/@common/providers/token.service'

@Injectable()
export class ProductCreateService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService
  ) {}

  async create(product: CreateProductDto, token: string) {
    const { email } = this.tokenService.GetInfoToken(token)!

    const user = await this.userRepository.findOneBy({ email })

    if (!user)
      throw new NotFoundException('No existe ningún usuario con ese Username')

    const productExists = await this.productsRepository.findOneBy({
      status: 'Activo',
      nombre: product.nombre
    })

    if (productExists)
      throw new ConflictException(
        `El producto con el nombre ${product.nombre} ya existe`
      )

    const result = await this.productsRepository.insert({ ...product, user })

    if (result.identifiers.length === 0)
      throw new InternalServerErrorException('No se pudo insertar el producto')

    return {
      message: 'Producto creado correctamente',
      statusCode: HttpStatus.CREATED,
      status: 'success',
      payload: true
    }
  }
}
