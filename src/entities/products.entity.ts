import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

import { BaseEntity } from './base'
import { PricesByCurrency } from './types'
import { UserEntity } from './users.entity'
import { InventoryEntity } from './inventory.entity'

@Entity()
export class ProductsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @Column()
  nombre: string

  @Column({ type: 'jsonb', nullable: false })
  pricesByCurrency: PricesByCurrency[]

  @Column('int')
  cantidad: number

  @Column({ type: 'text', array: true, nullable: false })
  characteristics: string[]

  @OneToMany(() => InventoryEntity, inventory => inventory.product, {
    nullable: false
  })
  inventory: InventoryEntity[]

  @ManyToOne(() => UserEntity, user => user.product, { nullable: false })
  @JoinColumn({ name: 'fk_create_user' })
  user: UserEntity
}
