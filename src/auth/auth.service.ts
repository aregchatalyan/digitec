import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '../jwt/jwt.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signup(dto: SignupDto) {
    const exists = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    if (exists) throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const salt = await bcrypt.genSalt(10);
    dto.password = await bcrypt.hash(dto.password, salt);

    const { password, ...user } = await this.prisma.user.create({ data: dto });

    return user;
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    if (!user) throw new NotFoundException('User not found');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);

    const tokens = this.jwtService.generate({
      id: user.id,
      email: user.email
    });

    await this.jwtService.save(user.id, tokens.refreshToken);

    const { password, ...userData } = user;

    return { ...userData, ...tokens }
  }

  async signout(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException();

    return this.jwtService.remove(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException();

    const isValid = this.jwtService.validate(refreshToken, 'JWT_REFRESH_SECRET');
    const session = await this.jwtService.find(refreshToken);
    if (!isValid || !session) throw new UnauthorizedException();

    const user = await this.prisma.user.findUnique({
      where: { id: session.userId }
    });
    if (!user) throw new UnauthorizedException();

    const tokens = this.jwtService.generate({
      id: user.id,
      email: user.email
    });
    await this.jwtService.save(user.id, tokens.refreshToken);

    const { password, ...userData } = user;

    return { ...userData, ...tokens }
  }
}
