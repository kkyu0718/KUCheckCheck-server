import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    await this.validateDuplicateMember(signUpInfoDto);
    return await this.authRepository.saveUser(signUpInfoDto);
  }

  async validateDuplicateMember(signUpInfoDto: SignUpInfoDto) {
    const { email }: { email: string } = signUpInfoDto;

    const result: member = await this.authRepository.findByEmail(email);
    if (result) {
      throw new ConflictException('existing_email');
    }
  }

  async signIn(signInInfoDto: SignInInfoDto) {
    const { email, password }: { email: string; password: string } =
      signInInfoDto;
    const user: member = await this.authRepository
      .findByEmailOrFail(email)
      .catch(() => {
        throw new NotFoundException('user_not_found');
      });

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
    }

    throw new UnauthorizedException('login_failure');
  }

  async getUserInfoById(id: number) {
    try {
      return await this.authRepository.findByIdOrFail(id);
    } catch {
      throw new NotFoundException('user_not_found');
    }
  }

  async updateUserInfoById(updateUserInfoDto: UpdateUserInfoDto) {
    const { id, password }: { id: number; password: string } =
      updateUserInfoDto;
    const salt: string = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const body = updateUserInfoDto;
    body['password'] = hashedPassword;
    try {
      await this.authRepository.update(id, body);

      return {
        status: 200,
        message: 'update success',
        data: await this.authRepository.findByIdOrFail(id),
      };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
