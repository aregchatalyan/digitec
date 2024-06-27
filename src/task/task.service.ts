import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(user: { id: number }, dto: CreateTaskDto) {
    try {
      return await this.prisma.task.create({
        data: {
          title: dto.title,
          description: dto.description,
          status: dto.status,
          user: {
            connect: {
              id: user.id
            }
          }
        }
      });
    } catch (e) {
      throw new NotFoundException('Task not found');
    }
  }

  async findAll(user: { id: number }) {
    return this.prisma.task.findMany({
      where: { userId: user.id }
    });
  }

  async findOne(user: { id: number }, taskId: number) {
    const task = await this.prisma.task.findFirst({
      where: { userId: user.id, id: taskId }
    });
    if (!task) throw new NotFoundException();

    return task;
  }

  async update(user: { id: number }, taskId: number, dto: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({
        where: { id: taskId, userId: user.id },
        data: dto
      });
    } catch (e) {
      throw new NotFoundException('Task not found');
    }
  }

  async remove(user: { id: number }, taskId: number) {
    try {
      await this.prisma.task.delete({
        where: { id: taskId, userId: user.id }
      });
    } catch (e) {
      throw new NotFoundException('Task not found');
    }
  }
}
