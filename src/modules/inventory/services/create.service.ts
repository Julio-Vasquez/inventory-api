import { Repository } from 'typeorm'
import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateInventoryDto } from '../dto'
import { CompanyEntity, InventoryEntity, ProductsEntity } from 'src/entities'

@Injectable()
export class InventoryCreateService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(ProductsEntity)
    private readonly productRepository: Repository<ProductsEntity>
  ) {}

  async create(inventory: CreateInventoryDto) {
    const inventoryExists = await this.inventoryRepository.findOneBy({
      status: 'Activo',
      company: { nit: inventory.companyId },
      product: { _id: inventory.productId }
    })

    if (inventoryExists) throw new ConflictException(`El inventario ya existe`)

    const company = await this.companyRepository.findOneBy({
      nit: inventory.companyId
    })

    if (!company)
      throw new NotFoundException(`No existe una compañía con ese NIT`)

    const product = await this.productRepository.findOneBy({
      _id: inventory.productId
    })
    if (!product)
      throw new NotFoundException(`No existe ningún producto con ese ID`)

    const result = await this.inventoryRepository.insert({
      quantity: inventory.quantity,
      company,
      product
    })

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
