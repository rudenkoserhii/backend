import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return await this.userService.createUser(userDto);
  }
}
