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
  Req,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseGuards(AuthGuard)
  @Put('')
  updateUserProfile(@Body() profileData: UpdateUserProfileDto, @Req() req) {
    return this.userProfileService?.updateUserProfile(req?.user, profileData);
  }

  @UseGuards(AuthGuard)
  @Get('')
  getUserProfile(@Req() reqData) {
    return this.userProfileService?.getUserProfileService(reqData?.user);
  }
}
