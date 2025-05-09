import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Rol } from './types'
import { BaseEntity } from './base'
import { CompanyEntity } from './company.entity'
import { ProductsEntity } from './products.entity'
import { matchPassword } from 'src/modules/@common/utils/hash.util'

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @Column('varchar', { nullable: false, length: 80 })
  name: string

  @Column('text', { unique: true, nullable: false })
  email: string

  @Column('text', { nullable: false })
  password: string

  @Column({ default: 'external' })
  role: Rol

  @OneToMany(() => CompanyEntity, company => company.user, { nullable: false })
  company: CompanyEntity[]

  @OneToMany(() => ProductsEntity, product => product.user, { nullable: false })
  product: ProductsEntity[]

  public async comparePassword(pwd: string): Promise<boolean> {
    return await matchPassword(this.password, pwd)
  }
}
