import { IsEnum, IsNotEmpty } from 'class-validator';
import { ThemeEnum } from 'src/types&enums/enum';

export class UpdateUserProfileDto {
  @IsNotEmpty()
  @IsEnum(ThemeEnum)
  theme: ThemeEnum;
}
