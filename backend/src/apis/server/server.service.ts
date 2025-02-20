import { v4 as uuidV4 } from 'uuid';
import { BadGatewayException, Injectable } from '@nestjs/common';

import ReturnResponse from 'src/helper/returnResponse';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServerType, UserTokenDataType } from 'src/types&enums/types';
import { MemberRole } from '@prisma/client';

@Injectable()
export class ServerService {
  constructor(private readonly prismaService: PrismaService) {}

  async createServer(
    server_data: CreateServerType,
    userData: UserTokenDataType,
  ) {
    try {
      const createdServer = await this.prismaService.server.create({
        data: {
          image_url: server_data.image_url,
          name: server_data?.name,
          user_id: userData?.id,
          invite_code: uuidV4(),
          channels: {
            create: [{ name: 'general', user_id: userData?.id }],
          },
          members: {
            create: [
              {
                user_id: userData?.id,
                role: MemberRole.ADMIN,
              },
            ],
          },
        },
        select: {
          id: true,
          name: true,
          image_url: true,
          invite_code: true,
        },
      });
      return ReturnResponse({ is_successful: true, response: createdServer });
    } catch (error) {
      console.log(error);

      throw new BadGatewayException(
        ReturnResponse({
          is_successful: false,
          error_msg: 'Something went wrong',
        }),
      );
    }
  }

  async getUserServers(userData: UserTokenDataType) {
    const userServers = await this.prismaService?.server?.findMany({
      where: {
        members: {
          some: {
            user_id: userData?.id,
          },
        },
      },
    });

    return ReturnResponse({ is_successful: true, response: userServers });
  }

  async getServerById(server_id: string) {
    const foundServer = await this.prismaService?.server?.findUnique({
      where: {
        id: server_id,
      },
      select: {
        id: true,
        image_url: true,
        name: true,
        invite_code: true,
        channels: {
          select: {
            id: true,
            name: true,
            created_at: true,
            type: true,
          },
          orderBy: {
            created_at: 'asc',
          },
        },
        members: {
          select: {
            role: true,
            user: {
              select: {
                username: true,
                user_profile: {
                  select: {
                    email: true,
                    image_url: true,
                    user_id: true,
                  },
                },
              },
            },
          },
          orderBy: {
            role: 'asc',
          },
        },
      },
    });

    const members = foundServer.members.map(({ user }) => ({
      email: user?.user_profile.email,
      image_url: user?.user_profile.image_url,
      user_id: user?.user_profile.user_id,
      username: user?.username,
    }));

    const returnObject = {
      ...foundServer,
      members,
    };

    return ReturnResponse({
      is_successful: true,
      response: returnObject,
    });
  }
}
