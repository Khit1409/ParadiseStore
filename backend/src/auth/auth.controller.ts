import { Body, Controller, Post, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto/login.dto';
import { RegisterDto } from './dto/register.dto/register.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //login
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);
    //save token on cookies
    res.cookie('token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });

    // response data for client
    return {
      message: result.message,
      resultCode: result.resultCode,
    };
  }

  //register
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  //check authentication
  @Get('check')
  checkAuth(@Req() req: Request) {
    return this.authService.checkAuth(req);
  }
  //logout
  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const result = this.authService.logout(req);
    res.clearCookie('token');
    return { message: result.message, resultCode: result.resultCode };
  }
}
