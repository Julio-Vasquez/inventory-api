import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { BaseEntity } from './base'
import { CompanyEntity } from './company.entity'
import { ProductsEntity } from './products.entity'

@Entity()
export class InventoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @ManyToOne(() => CompanyEntity, company => company.inventory, {
    nullable: false
  })
  @JoinColumn({ name: 'fk_empresa' })
  company: CompanyEntity

  @ManyToOne(() => ProductsEntity, product => product.inventory, {
    nullable: false
  })
  @JoinColumn({ name: 'fk_product' })
  product: CompanyEntity
}
