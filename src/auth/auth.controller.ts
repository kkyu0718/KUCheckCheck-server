import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  UseGuards,
  ValidationPipe,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import {
  GetUserInfoDto,
  SignInInfoDto,
  SignUpInfoDto,
  UpdateUserInfoDto,
} from './dto/auth-credential.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpInfoDto: SignUpInfoDto) {
    return this.authService.signUp(signUpInfoDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInInfoDto: SignInInfoDto) {
    return this.authService.signIn(signInInfoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  getUserInfo(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getUserInfoById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/user/:id/update')
  updateUserinfo(@Body() body, @Param('id', ParseIntPipe) id: number) {
    const updateUserInfoDto: UpdateUserInfoDto = {
      ...body,
      id: id,
    };
    return this.authService.updateUserInfoById(updateUserInfoDto);
  }
}
