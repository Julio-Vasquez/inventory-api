import {
  Column,
  CreateDateColumn,
  Generated,
  Index,
  UpdateDateColumn
} from 'typeorm'

@Index(['publicKey'], { unique: true })
export abstract class BaseEntity {
  @Generated('uuid')
  @Column('uuid', { nullable: false })
  public publicKey!: string

  @CreateDateColumn({ type: 'timestamp' })
  public createAt!: string

  @UpdateDateColumn({ type: 'timestamp' })
  public updateAt!: string
}
