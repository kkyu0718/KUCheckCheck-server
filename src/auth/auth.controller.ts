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
  Headers,
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
  signUp(@Body(ValidationPipe) signUpInfoDto: SignUpInfoDto) {
    return this.authService.signUp(signUpInfoDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInInfoDto: SignInInfoDto) {
    return this.authService.signIn(signInInfoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/myinfo')
  myinfo(@Headers() headers) {
    const accessToken = headers['authorization'];
    return this.authService.getUserInfo(accessToken);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/myinfo/update')
  updateMyinfo(@Body(ValidationPipe) updateUserInfoDto: UpdateUserInfoDto) {
    return this.authService.updateUserInfo(updateUserInfoDto);
  }
}
