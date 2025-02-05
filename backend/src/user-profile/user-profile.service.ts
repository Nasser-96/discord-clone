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
  async updateUserProfile(token: string, profileData: UpdateUserProfileDto) {
    try {
      const decodedData: UserTokenDataType = this.jwtService.verify(token, {
        secret: process.env.JSON_TOKEN_KEY,
      });

      const defaultValues: UpdateUserProfileDto = {
        preferred_language:
          decodedData?.profile?.preferred_language ?? PreferredLanguageEnum?.EN,
        theme: decodedData?.profile?.theme ?? ThemeEnum.DARK,
        email: decodedData?.profile?.email ? decodedData?.profile?.email : '',
        image_url: decodedData?.profile?.image_url
          ? decodedData?.profile?.image_url
          : '',
        name: decodedData?.profile?.name ? decodedData?.profile?.name : '',
      };

      const updatedProfile = await this.prismaService?.profile?.upsert({
        where: { user_id: parseInt(decodedData?.id) },
        update: { ...profileData },
        create: {
          ...defaultValues,
          ...profileData,
          user_id: parseInt(decodedData?.id),
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
}
