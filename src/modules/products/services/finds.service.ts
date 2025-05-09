import { Repository } from 'typeorm'
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CompanyEntity, ProductsEntity } from 'src/entities'
import { ApiResponse } from 'src/global/interfaces'

@Injectable()
export class ProductFindsServices {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>
  ) {}

  async findAll(): Promise<ApiResponse<ProductsEntity[]>> {
    const products = await this.productsRepository.findBy({ status: 'Activo' })

    return {
      message: 'Lista de productos',
      statusCode: HttpStatus.OK,
      status: 'success',
      payload: products
    }
  }

  async findById(_id: string): Promise<ApiResponse<ProductsEntity>> {
    const product = await this.productsRepository.findOneBy({
      status: 'Activo',
      _id
    })

    if (!product)
      throw new NotFoundException(`No se encontró el producto con ID ${_id}`)

    return {
      message: 'Product encontrado',
      statusCode: HttpStatus.OK,
      status: 'success',
      payload: product
    }
  }

  async findByCompany(nit: string) {
    console.log(nit)
  }
}
