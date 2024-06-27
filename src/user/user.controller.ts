import {
  Controller,
  Get,
  Body,
  Delete,
  Req,
  UseGuards,
  Put,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: Request) {
    return this.userService.me(req.user as { id: number });
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  update(@Req() req: Request, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user as { id: number }, dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Req() req: Request) {
    return this.userService.remove(req.user as { id: number });
  }
}
