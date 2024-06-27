import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtService } from '../jwt/jwt.service';
import { TaskController } from './task.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ TaskController ],
  providers: [ TaskService, JwtService, PrismaService ]
})
export class TaskModule {}
