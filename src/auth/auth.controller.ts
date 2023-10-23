import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../user/user.model';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from './common/guards/accessToken.guard';
import { RefreshTokenGuard } from './common/guards/refreshToken.guard';

@ApiTags('Authorisation')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: [User] })
  @Post('signup')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('login')
  login(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200 })
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logOut(req.user['sub']);
  }

  @ApiOperation({ summary: 'Refresh user' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
