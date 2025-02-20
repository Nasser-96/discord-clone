import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserTokenDataType } from 'src/types&enums/types';
import ReturnResponse from 'src/helper/returnResponse';

@Injectable()
export class ServerMemberGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload: UserTokenDataType = await this.jwtService.verifyAsync(
      token,
      {
        secret: process.env.JSON_TOKEN_KEY,
      },
    );
    payload?.id;
    const serverId = request.params.server_id; // Get server ID from request

    if (!payload?.id || !serverId) {
      throw new ForbiddenException(
        ReturnResponse({
          is_successful: false,
          error_msg: 'Missing user ID or server ID',
        }),
      );
    }

    // Check if the user is part of the server
    const isMember = await this.prisma.server.findUnique({
      where: {
        id: serverId,
        members: { some: { user_id: payload?.id } },
      },
    });

    if (!isMember) {
      // NotFoundException because user should not know if the server is exist or not
      throw new NotFoundException(
        ReturnResponse({
          is_successful: false,
          error_msg: 'Server not Exist',
        }),
      );
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
