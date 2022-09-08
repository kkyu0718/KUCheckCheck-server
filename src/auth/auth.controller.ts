import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { response, Response } from 'express';
import { UserInfo } from 'os';
import { AuthService } from './auth.service';
import {
  MyInfoDto,
  SignInInfoDto,
  SignUpInfoDto,
  UpdateUserInfoDto,
} from './dto/auth-credential.dto';
import { User } from './member.entity';

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

  //@UseGuards('jwt')
  @Get('/myinfo')
  myinfo(@Body(ValidationPipe) myInfoDto: MyInfoDto) {
    return this.authService.getUserInfo(myInfoDto);
  }

  @Put('/myinfo/update')
  updateMyinfo(@Body(ValidationPipe) updateUserInfoDto: UpdateUserInfoDto) {
    return this.authService.updateUserInfo(updateUserInfoDto);
  }
}
