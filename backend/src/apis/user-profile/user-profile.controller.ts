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
import { AuthGuard } from '../auth/auth.guard';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseGuards(AuthGuard)
  @Put('')
  updateUserProfile(
    @Body() profileData: UpdateUserProfileDto,
    @Headers('authorization') token: string,
  ) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }
    return this.userProfileService?.updateUserProfile(token, profileData);
  }

  @UseGuards(AuthGuard)
  @Get('')
  getUserProfile(@Headers('authorization') token: string) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }
    return this.userProfileService?.getUserProfileService(token);
  }
}
