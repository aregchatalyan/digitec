import {
  Controller,
  Post,
  Body,
  Put,
  Res,
  Req,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus, Get
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async signin(@Res({ passthrough: true }) res: Response, @Body() dto: SigninDto) {
    const user = await this.authService.signin(dto);

    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    const { refreshToken, ...userData } = user;

    return userData;
  }

  @Post('signout')
  async signout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.signout(req.cookies.refreshToken);

    res.clearCookie('refreshToken');

    res.end();
  }

  @Put('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.refresh(req.cookies.refreshToken);

    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    const { refreshToken, ...userData } = user;

    return userData;
  }
}
