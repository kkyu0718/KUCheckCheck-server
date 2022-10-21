import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SignInInfoDto,
  SignUpInfoDto,
  UpdateUserInfoDto,
} from './dto/auth-credential.dto';
import { AuthRepository } from './auth.repository';
import { member } from './member.entity';
import * as bcrypt from 'bcryptjs';
import { UserRole } from './role/user.role';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpInfoDto: SignUpInfoDto) {
    const { password }: { password: string } = signUpInfoDto;
    const salt: string = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(password, salt);
    signUpInfoDto['password'] = hashedPassword;
    return await this.authRepository.saveUserOrFail(signUpInfoDto);
  }

  async signIn(signInInfoDto: SignInInfoDto) {
    const { email, password }: { email: string; password: string } =
      signInInfoDto;
    const user: member = await this.authRepository.findByEmailOrFail(email);

    if (await bcrypt.compare(password, user.password)) {
      const payload: {
        id: number;
        email: string;
        name: string;
        role: UserRole;
      } = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
      const signOption: object = { expiresIn: '2h' };
      const accessToken: string = this.jwtService.sign(payload, signOption);
      return { accessToken };
    } else {
      throw new HttpException('login_failure', HttpStatus.UNAUTHORIZED);
    }
  }

  async getUserInfoById(id: number) {
    return await this.authRepository.findByIdOrFail(id);
  }

  async updateUserInfoById(updateUserInfoDto: UpdateUserInfoDto) {
    const { id, password }: { id: number; password: string } =
      updateUserInfoDto;
    const salt: string = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const body = updateUserInfoDto;
    body['password'] = hashedPassword;
    await this.authRepository.update(id, body);

    return {
      status: 200,
      message: 'update success',
      data: await this.authRepository.findByIdOrFail(id),
    };
  }
}
