import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { BaseEntity } from './base'
import { CompanyEntity } from './company.entity'
import { ProductsEntity } from './products.entity'

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @Column('text', { unique: true, nullable: false })
  email: string

  @Column('text', { nullable: false })
  password: string

  @Column({ default: 'external' })
  role: 'admin' | 'external'

  @OneToMany(() => CompanyEntity, company => company.user, { nullable: false })
  company: CompanyEntity[]

  @OneToMany(() => ProductsEntity, product => product.user, { nullable: false })
  product: ProductsEntity[]
}
