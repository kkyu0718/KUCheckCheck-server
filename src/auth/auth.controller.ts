import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  UseGuards,
  Param,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import {
  SignInInfoDto,
  SignUpInfoDto,
  UpdateUserInfoDto,
} from './dto/auth-credential.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpInfoDto: SignUpInfoDto) {
    return this.authService.signUp(signUpInfoDto);
  }

  @Post('/signin')
  signIn(@Body() signInInfoDto: SignInInfoDto) {
    return this.authService.signIn(signInInfoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  getUserInfo(@Param('id') id: number) {
    return this.authService.getUserInfoById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/user/:id/update')
  updateUserinfo(@Body() body, @Param('id') id: number) {
    const updateUserInfoDto: UpdateUserInfoDto = {
      ...body,
      id: id,
    };
    return this.authService.updateUserInfoById(updateUserInfoDto);
  }
}
