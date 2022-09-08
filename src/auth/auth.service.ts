import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MyInfoDto,
  SignInInfoDto,
  SignUpInfoDto,
  UpdateUserInfoDto,
} from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpInfo: SignUpInfoDto) {
    return this.userRepository.createUser(signUpInfo);
  }

  async signIn(signInInfo: SignInInfoDto) {
    const { email, password } = signInInfo;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        name: user.name,
        role: user.role,
        email: user.email,
      };
      const accessToken = await this.jwtService.sign(payload, {
        expiresIn: 60 * 60 * 2,
      }); // 2hour
      // const refreshToken = await this.jwtService.sign({payload}, {expiresIn : 60*60*24}) // 24hour
      // const cookie = {accessToken, refreshToken}

      //await this.userRepository.saveRefreshToken(user, refreshToken)
      return accessToken;
    } else {
      throw new UnauthorizedException('Login Failed');
    }
  }

  async getUserInfo(myInfo: MyInfoDto) {
    const { accessToken } = myInfo;
    const decodedAccessToken = await this.jwtService.decode(accessToken);
    const email = decodedAccessToken['email'];
    const userInfo = await this.userRepository.findOneBy({ email });
    return userInfo;
  }

  async updateUserInfo(updateUserInfo: UpdateUserInfoDto) {
    const email = updateUserInfo['email'];
    const userInfo = await this.userRepository.findOneBy({ email });
    // console.log('userInfo1', userInfo);
    const id = userInfo['id'];
    // console.log('userInfo2', userInfo);

    // return [userInfo, id];
    return this.userRepository.update(id, updateUserInfo);
  }
}
