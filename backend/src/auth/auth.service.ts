import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import ReturnResponse from 'src/helper/returnResponse';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { PreferredLanguageEnum, ThemeEnum } from 'src/types&enums/enum';
import { UserDataType } from 'src/types&enums/types';
import { UpdateUserProfileDto } from 'src/user-profile/dto/update-user-profile.dto';

interface SignupParams {
  password: string;
  username: string;
}

interface LoginParams {
  password: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup({ username, password }: SignupParams) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (userExists) {
      throw new ConflictException(
        ReturnResponse({
          response: [{ field: 'username', error: 'Username Already Exists' }],
          is_successful: false,
        }),
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultValues: UpdateUserProfileDto = {
      theme: ThemeEnum.DARK,
      preferred_language: PreferredLanguageEnum.EN,
      email: '',
      image_url: '',
      name: '',
    };

    const user = await this.prismaService?.user.create({
      data: {
        username: username,
        password: hashedPassword,
        user_profile: {
          create: {
            ...defaultValues,
          },
        },
      },
      include: {
        user_profile: true,
      },
    });

    const userData: UserDataType = {
      id: user?.id?.toString(),
      profile: { ...user?.user_profile },
      username: user?.username,
    };

    const token = await this.generateJWT(userData);

    return ReturnResponse({
      response: { user_token: token },
      success: 'User Created Successfully',
      is_successful: true,
    });
  }

  private async generateJWT(userData: UserDataType) {
    const timeToExpire = 60 * 60 * 24 * 2; // 2 days
    return this.jwtService.signAsync(
      {
        ...userData,
      },
      { secret: process.env.JSON_TOKEN_KEY, expiresIn: `${timeToExpire}s` },
    );
  }

  async login({ username, password }: LoginParams) {
    const getUserByEmail = await this.prismaService.user.findUnique({
      where: {
        username,
      },
      include: {
        user_profile: {
          select: {
            email: true,
            image_url: true,
            name: true,
            preferred_language: true,
            theme: true,
          },
        },
      },
    });

    if (!getUserByEmail) {
      throw new UnauthorizedException(
        ReturnResponse({
          error_msg: 'Username or Password incorrect',
          is_successful: false,
        }),
      );
    }
    const isValidPassword = await bcrypt?.compare(
      password,
      getUserByEmail?.password,
    );

    if (getUserByEmail && isValidPassword) {
      const userData: UserDataType = {
        id: getUserByEmail?.id?.toString(),
        username: getUserByEmail?.username,
        profile: {
          ...getUserByEmail?.user_profile,
        },
      };
      const token = await this.generateJWT(userData);

      return ReturnResponse({
        response: { user_token: token, username },
        is_successful: true,
      });
    } else {
      throw new UnauthorizedException(
        ReturnResponse({ error_msg: 'Username or Password incorrect' }),
      );
    }
  }

  async updateUserName(token: string, newName: string) {
    const decodedData = this.jwtService.verify(token, {
      secret: process.env.JSON_TOKEN_KEY,
    });

    await this.prismaService.user.update({
      where: { id: decodedData.id },
      data: { username: newName },
    });
  }

  async getNewToken(token: string) {
    const decodedData = this.jwtService.verify(token, {
      secret: process.env.JSON_TOKEN_KEY,
    });

    const getUserById = await this.prismaService.user.findUnique({
      where: {
        id: parseInt(decodedData?.id),
      },
      select: {
        id: true,
        user_profile: true,
        username: true,
      },
    });
    const newData: UserDataType = {
      id: getUserById?.id?.toString(),
      profile: {
        ...getUserById?.user_profile,
      },
      username: getUserById?.username,
    };
    const newToken = await this.generateJWT({ ...newData });

    return ReturnResponse({
      is_successful: true,
      response: { access_token: newToken },
    });
  }
}
