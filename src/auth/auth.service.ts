import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MyInfoDto,
  SignInInfoDto,
  SignUpInfoDto,
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

  async signUp(signUpInfoDto: SignUpInfoDto) {
    return this.userRepository.createUser(signUpInfoDto);
  }

  async signIn(signInInfoDto: SignInInfoDto) {
    const { email, password } = signInInfoDto;
    const user = await this.userRepository.findOneBy({ email });
    const name = user.name;

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

  async getUserInfo(myInfoDto: MyInfoDto) {
    // const {accessToken} = myInfoDto;
    // const decodedAccessToken = this.jwtService.decode(accessToken)
    // const email = decodedAccessToken.email;
    // const userInfo = this.userRepository.findOneBy({accessToken.email})
    // return
  }
}
