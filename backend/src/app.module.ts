import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SocketModule } from './socket/socket.module';
import { JwtModule } from '@nestjs/jwt';
import { AppGateway } from './socket/socket.gateway';
import { UserProfileModule } from './apis/user-profile/user-profile.module';
import { AuthModule } from './apis/auth/auth.module';
import { UploadModule } from './apis/upload/upload.module';
import { UploadController } from './apis/upload/upload.controller';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    SocketModule,
    UserProfileModule,
    JwtModule.register({
      secret: process.env.JSON_TOKEN_KEY,
    }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
