import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import ReturnResponse from 'src/helper/returnResponse';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async updateUserProfile(token: string, profileData: UpdateUserProfileDto) {
    try {
      const decodedData = this.jwtService.verify(token, {
        secret: process.env.JSON_TOKEN_KEY,
      });

      const updatedProfile = await this.prismaService?.user_profile?.update({
        where: { id: parseInt(decodedData?.id) },
        data: { ...profileData },
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
