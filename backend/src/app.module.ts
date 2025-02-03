import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SocketModule } from './socket/socket.module';
import { JwtModule } from '@nestjs/jwt';
import { AppGateway } from './socket/socket.gateway';
import { UserProfileModule } from './user-profile/user-profile.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    SocketModule,
    UserProfileModule,
    JwtModule.register({
      secret: process.env.JSON_TOKEN_KEY,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
