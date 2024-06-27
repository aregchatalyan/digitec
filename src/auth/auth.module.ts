import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '../jwt/jwt.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ AuthController ],
  providers: [ AuthService, JwtService, PrismaService ]
})
export class AuthModule {}
