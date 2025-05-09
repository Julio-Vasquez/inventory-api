import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm'

import { BaseEntity } from './base'
import { UserEntity } from './users.entity'
import { InventoryEntity } from './inventory.entity'

@Entity()
export class CompanyEntity extends BaseEntity {
  @PrimaryColumn()
  nit: string

  @Column('varchar', { length: 50, nullable: false })
  nombre: string

  @Column('text', { nullable: false })
  address: string

  @Column('int', { nullable: false })
  phone: string

  @Column('text', { nullable: false })
  email: string

  @OneToMany(() => InventoryEntity, inventory => inventory.company, {
    nullable: false
  })
  inventory: InventoryEntity[]

  @ManyToOne(() => UserEntity, user => user.company, { nullable: false })
  @JoinColumn({ name: 'fk_create_user' })
  user: UserEntity
}
