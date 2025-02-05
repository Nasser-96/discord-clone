import { PreferredLanguageEnum, ThemeEnum } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @IsEnum(ThemeEnum)
  theme: ThemeEnum;

  @IsEnum(PreferredLanguageEnum)
  preferred_language: PreferredLanguageEnum;

  @IsString()
  name: string;
  @IsString()
  image_url: string;
  @IsString()
  email: string;
}
