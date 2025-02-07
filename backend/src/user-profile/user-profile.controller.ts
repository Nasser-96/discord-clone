import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseGuards(AuthGuard)
  @Put('')
  updateUserTheme(
    @Headers('authorization') token: string,
    @Body() profileData: UpdateUserProfileDto,
  ) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }
    return this.userProfileService?.updateUserProfile(token, profileData);
  }
}
