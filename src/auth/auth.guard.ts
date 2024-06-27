import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class JwtAuthGuard {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException();

    try {
      const decoded = this.jwtService.validate(token, 'JWT_ACCESS_SECRET');
      if (!decoded) throw new UnauthorizedException();

      req.user = decoded;

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
