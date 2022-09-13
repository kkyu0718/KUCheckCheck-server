import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SignInInfoDto,
  SignUpInfoDto,
  UpdateUserInfoDto,
} from './dto/auth-credential.dto';
import { MemberRepository } from './member.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpInfoDto: SignUpInfoDto) {
    return this.memberRepository.createUser(signUpInfoDto);
  }

  async signIn(signInInfoDto: SignInInfoDto) {
    const { email, password } = signInInfoDto;
    const user = await this.memberRepository.findOneBy({ email });
    if (!user) throw new NotFoundException('user_not_found');

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
      throw new UnauthorizedException('login_failure');
    }
  }

  async getUserInfo(accessToken) {
    const token = accessToken.replace('Bearer ', '');
    const decodedToken = await this.jwtService.decode(token);
    const email = decodedToken['email'];
    const userInfo = await this.memberRepository.findOneBy({ email });
    return userInfo;
  }

  async updateUserInfo(updateUserInfoDto: UpdateUserInfoDto) {
    const email = updateUserInfoDto['email'];
    const userInfo = await this.memberRepository.findOneBy({ email });
    const id = userInfo['id'];

    await this.memberRepository.update(id, updateUserInfoDto);

    return {
      message: 'update success',
      data: await this.memberRepository.findOneBy({ id }),
    };
  }
}
