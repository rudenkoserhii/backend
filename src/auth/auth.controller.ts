import { Body, Controller, Post, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../user/user.model';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Authorisation')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('login')
  login(@Body() data: AuthDto) {
    return this.authService.login(data);
  }
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: [User] })
  @Post('signup')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200 })
  @Get('logout')
  logout(@Request() req: any) {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
