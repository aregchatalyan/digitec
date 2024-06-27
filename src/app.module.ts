import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true
    }),
    JwtModule,
    AuthModule,
    UserModule,
    TaskModule
  ],
  providers: [ PrismaService ]
})
export class AppModule {}
