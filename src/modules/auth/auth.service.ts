import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

import { User } from './auth.interface'
import { UserEntity } from 'src/entities'
import { LoginDto, SignupDto } from './dto'
import { ApiResponse } from 'src/global/interfaces'
import { hashPassword } from '../@common/utils/hash.util'
import { TokenService } from '../@common/providers/token.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: TokenService
  ) {}

  async signup(user: SignupDto): Promise<ApiResponse<boolean>> {
    const userExists = await this.userRepository.findOneBy({
      status: 'Activo',
      email: user.email
    })

    if (userExists)
      throw new ConflictException(`El correo ${user.email} ya está registrado`)

    const newUser = await this.userRepository.insert({
      ...user,
      email: user.email.toLowerCase(),
      password: await hashPassword(user.password.toLowerCase())
    })

    if (newUser.identifiers.length === 0)
      throw new InternalServerErrorException('No se pudo registrar el usuario')

    return {
      message: 'Usuario creado correctamente',
      statusCode: HttpStatus.CREATED,
      status: 'success',
      payload: true
    }
  }

  async login(user: LoginDto): Promise<ApiResponse<User>> {
    const userExists = await this.userRepository.findOneBy({
      email: user.email.toLowerCase(),
      status: 'Activo'
    })

    if (!userExists)
      throw new NotFoundException('No existe ninguna cuenta con ese email!')

    const check: boolean = await userExists.comparePassword(
      user.password.toLowerCase()
    )

    if (!check) throw new BadRequestException('No coincide la contraseña')

    const { _id, email, name, role } = userExists

    const token = await this.jwtService.GenerateToken({
      _id,
      email,
      name,
      role
    })

    if (!token)
      throw new NotFoundException('Error en la serialización del token')

    return {
      status: 'success',
      message: 'token generado correctamente',
      statusCode: HttpStatus.OK,
      payload: { token, _id, email, name, role }
    }
  }
}
