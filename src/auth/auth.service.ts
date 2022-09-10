import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MyInfoDto,
  SignInInfoDto,
  SignUpInfoDto,
  UpdateUserInfoDto,
} from './dto/auth-credential.dto';
import { MEMBER } from './member.entity';
import { UserRepository } from './member.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, response } from 'express';
import { decode } from 'punycode';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpInfoDto: SignUpInfoDto) {
    return this.userRepository.createUser(signUpInfoDto);
  }

  async signIn(signInInfoDto: SignInInfoDto) {
    const { email, password } = signInInfoDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        name: user.name,
        role: user.role,
        email: user.email,
      };
      const accessToken = await this.jwtService.sign(payload, {
        expiresIn: '2h',
      });

      const data = {
        accessToken,
      };
      return data;
    } else {
      throw new UnauthorizedException('Login Failed');
    }
  }

  async getUserInfo(accessToken) {
    const token = accessToken.replace('Bearer ', '');
    const decodedToken = await this.jwtService.decode(token);
    const email = decodedToken['email'];
    const userInfo = await this.userRepository.findOneBy({ email });
    return userInfo;
  }

  async updateUserInfo(updateUserInfoDto: UpdateUserInfoDto) {
    const email = updateUserInfoDto['email'];
    const userInfo = await this.userRepository.findOneBy({ email });
    const id = userInfo['id'];

    return this.userRepository.update(id, updateUserInfoDto);
  }
}
