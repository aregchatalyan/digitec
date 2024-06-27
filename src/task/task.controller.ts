import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Request } from 'express';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Req() req: Request, @Body() dto: CreateTaskDto) {
    return this.taskService.create(req.user as { id: number }, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    return this.taskService.findAll(req.user as { id: number });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.taskService.findOne(req.user as { id: number }, +id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  update(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(req.user as { id: number }, +id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.taskService.remove(req.user as { id: number }, +id);
  }
}
