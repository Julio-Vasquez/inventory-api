import { SetMetadata } from '@nestjs/common'

import { Rol } from 'src/entities/types'
import { ROLES } from '../constants/jwt.constant'

const Roles = (...roles: Rol[]) => SetMetadata(ROLES, roles)

const Admin = () => SetMetadata(ROLES, 'admin')
const External = () => SetMetadata(ROLES, 'external')
const AllRoles = () => SetMetadata(ROLES, ['admin', 'external'])

export { AllRoles, External, Admin, Roles }
