import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'

import { UserEntity } from 'src/entities'
import { ApiResponse } from 'src/global/interfaces'

@Injectable()
export class UserFindService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async validateUserJwt(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email })

    if (!user) return false

    return user.status === 'Activo'
  }

  async findAll(): Promise<ApiResponse<UserEntity[]>> {
    const users = await this.userRepository.findBy({ status: 'Activo' })

    return {
      message: 'Lista de usuarios activos',
      statusCode: HttpStatus.OK,
      status: 'success',
      payload: users
    }
  }

  async findById(_id: string): Promise<ApiResponse<UserEntity>> {
    const user = await this.userRepository.findOneBy({ status: 'Activo', _id })

    if (!user)
      throw new NotFoundException(`No se encontró el usuario con ID ${_id}`)

    return {
      message: 'Usuario encontrado',
      statusCode: HttpStatus.OK,
      status: 'success',
      payload: user
    }
  }
}
