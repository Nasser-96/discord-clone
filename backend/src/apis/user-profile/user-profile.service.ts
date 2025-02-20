import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import ReturnResponse from 'src/helper/returnResponse';
import { PreferredLanguageEnum, ThemeEnum } from 'src/types&enums/enum';
import { UserTokenDataType } from 'src/types&enums/types';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async updateUserProfile(
    decodedData: UserTokenDataType,
    profileData: UpdateUserProfileDto,
  ) {
    try {
      const defaultValues: UpdateUserProfileDto = {
        preferred_language:
          decodedData?.profile?.preferred_language ?? PreferredLanguageEnum?.EN,
        theme: decodedData?.profile?.theme ?? ThemeEnum.DARK,
        image_url: decodedData?.profile?.image_url
          ? decodedData?.profile?.image_url
          : '',
        name: decodedData?.profile?.name ? decodedData?.profile?.name : '',
      };

      const updatedProfile = await this.prismaService?.profile?.upsert({
        where: { user_id: decodedData?.id },
        update: { ...profileData },
        create: {
          ...defaultValues,
          ...profileData,
          user_id: decodedData?.id,
        },
      });

      return ReturnResponse({
        is_successful: true,
        response: { ...updatedProfile },
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(
        ReturnResponse({ error_msg: "You can't update this profile" }),
      );
    }
  }

  async getUserProfileService(decodedData: UserTokenDataType) {
    const userProfile = await this.prismaService?.profile?.findUnique({
      where: { user_id: decodedData?.id },
      select: {
        id: true,
        email: true,
        image_url: true,
        theme: true,
        created_at: true,
        user_data: {
          select: {
            channels: true,
            password: false,
            username: true,
            created_at: true,
            id: true,
          },
        },
        name: true,
        preferred_language: true,
        updated_at: true,
      },
    });

    const userServer = await this.prismaService?.server?.findFirst({
      select: {
        id: true,
        name: true,
        image_url: true,
        created_at: true,
        updated_at: true,
        invite_code: true,
      },
      where: { members: { some: { user_id: decodedData?.id } } },
    });

    return ReturnResponse({
      is_successful: true,
      response: { profile: userProfile, server: userServer },
    });
  }
}
