import {
  Column,
  CreateDateColumn,
  Generated,
  Index,
  UpdateDateColumn
} from 'typeorm'

import { Status } from '../types'

@Index(['publicKey'], { unique: true })
export abstract class BaseEntity {
  @Generated('uuid')
  @Column('uuid', { nullable: false })
  publicKey!: string

  @CreateDateColumn({ type: 'timestamp' })
  createAt!: string

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt!: string

  @Column({ default: 'Activo' })
  status: Status
}
