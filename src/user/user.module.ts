import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '../jwt/jwt.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ UserController ],
  providers: [ UserService, JwtService, PrismaService ]
})
export class UserModule {}
