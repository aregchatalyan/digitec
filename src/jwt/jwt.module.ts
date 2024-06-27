import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ JwtService, PrismaService ]
})
export class JwtModule {}
