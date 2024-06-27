import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async me(user: { id: number }) {
    const exists = await this.prisma.user.findUnique({
      where: { id: user.id }
    });
    if (!exists) throw new NotFoundException('User not found');

    const { password, ...userData } = exists;

    return userData;
  }

  async update(user: { id: number }, dto: UpdateUserDto) {
    const exists = await this.prisma.user.findUnique({
      where: { id: user.id }
    });
    if (!exists) throw new NotFoundException('User not found');

    if (dto.password) {
      const salt = await bcrypt.genSalt(10);
      dto.password = await bcrypt.hash(dto.password, salt);
    }

    const { password, ...userData } = await this.prisma.user.update({
      where: { id: user.id },
      data: dto
    });

    return userData;
  }

  async remove(user: { id: number }) {
    try {
      await this.prisma.user.delete({
        where: { id: user.id },
        include: {
          tasks: true,
          token: true
        }
      });
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }
}
