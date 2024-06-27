import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService
  ) {}

  generate(payload: { id: number, email: string }) {
    return {
      accessToken: jwt.sign(payload, this.config.get<string>('JWT_ACCESS_SECRET'), { expiresIn: '1d' }),
      refreshToken: jwt.sign(payload, this.config.get<string>('JWT_REFRESH_SECRET'), { expiresIn: '30d' })
    }
  }

  validate(token: string, type: 'JWT_ACCESS_SECRET' | 'JWT_REFRESH_SECRET') {
    try {
      return jwt.verify(token, this.config.get<string>(type));
    } catch (e) {
      return null;
    }
  }

  async save(userId: number, refreshToken: string) {
    const exists = await this.prisma.token.findUnique({
      where: { userId }
    });
    if (exists) {
      return this.prisma.token.update({
        where: { userId },
        data: { refreshToken }
      });
    }

    return this.prisma.token.create({
      data: { userId, refreshToken, }
    });
  }

  async remove(refreshToken: string) {
    return this.prisma.token.delete({
      where: { refreshToken }
    });
  }

  async find(refreshToken: string) {
    return this.prisma.token.findUnique({
      where: { refreshToken }
    });
  }
}
