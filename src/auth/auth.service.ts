import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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
import { AuthRepository } from './auth.repository';
import { member } from './member.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {}

  async signUp(signUpInfoDto: SignUpInfoDto) {
    const { password }: { password: string } = signUpInfoDto;
    const hashedPassword: string = await this.authRepository.hashPassword(
      password,
    );
    signUpInfoDto['password'] = hashedPassword;
    await this.validateDuplicateMember(signUpInfoDto);
    return this.authRepository.saveUser(signUpInfoDto);
  }

  async validateDuplicateMember(signUpInfoDto: SignUpInfoDto) {
    const { email }: { email: string } = signUpInfoDto;
    try {
      await this.authRepository.findByEmailOrFail(email);
    } catch {
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

    try {
      await this.authRepository.comparePassword(password, user.password);
      const signOption: object = { expiresIn: '2h' };
      return this.authRepository.createAccessToken(user, signOption);
    } catch {
      throw new UnauthorizedException('login_failure');
    }
  }

  async getUserInfoById(getUserInfoDto: GetUserInfoDto) {
    const { id } = getUserInfoDto;
    try {
      return await this.authRepository.findByIdOrFail(id);
    } catch {
      throw new NotFoundException('user_not_found');
    }
  }

  async updateUserInfoById(updateUserInfoDto: UpdateUserInfoDto) {
    const { id, password }: { id: number; password: string } =
      updateUserInfoDto;
    const hashedPassword = await this.authRepository.hashPassword(password);
    const body = updateUserInfoDto;
    body['password'] = hashedPassword;
    try {
      await this.authRepository.update(id, body);

      return {
        status: 200,
        message: 'update success',
        data: await this.authRepository.findById(id),
      };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
