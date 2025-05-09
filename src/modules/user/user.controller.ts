import {
  Controller,
  // Delete,
  Get,
  Param,
  ParseUUIDPipe
  // Put
} from '@nestjs/common'
import { UserFindService } from './services'
import { Admin } from 'src/global/decorator/rol.decorator'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserFindService) {}

  @Get()
  @Admin()
  async findAll() {
    return await this.userService.findAll()
  }

  @Get(':_id')
  @Admin()
  async findById(@Param('_id', new ParseUUIDPipe()) _id: string) {
    const user = await this.userService.findById(_id)

    return user
  }

  // @Put(':_id')
  // async update(
  //   @Param('_id', new ParseUUIDPipe()) _id: string,
  //   @Body() dto: UpdateUserDto
  // ) {
  //   return this.userService.update(id, dto)
  // }

  // @Delete(':_id')
  // async remove(@Param('_id', new ParseUUIDPipe()) _id: string) {
  //   return this.userService.remove(id)
  // }
}
