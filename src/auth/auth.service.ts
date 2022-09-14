import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  GetUserInfoDto,
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
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
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

  async getUserInfo(getUserInfoDto: GetUserInfoDto) {
    const { id } = getUserInfoDto;
    const userInfo = await this.memberRepository.findOneBy({ id });
    return userInfo;
  }

  async updateUserInfo(updateUserInfoDto: UpdateUserInfoDto) {
    const { id, ...body } = updateUserInfoDto;

    await this.memberRepository.update(id, body);

    return {
      message: 'update success',
      data: await this.memberRepository.findOneBy({ id }),
    };
  }
}
