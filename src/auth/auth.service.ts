import {
  ConflictException,
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
    const result: member = await this.authRepository.findByEmail(email);
    if (result) {
      throw new ConflictException('existing_email');
    }
  }

  async signIn(signInInfoDto: SignInInfoDto) {
    const { email, password }: { email: string; password: string } =
      signInInfoDto;
    const user: member = await this.authRepository.findByEmail(email);
    if (!user) throw new NotFoundException('user_not_found');

    if (await this.authRepository.comparePassword(password, user.password)) {
      const signOption: object = { expiresIn: '2h' };
      return this.authRepository.createAccessToken(user, signOption);
    } else {
      throw new UnauthorizedException('login_failure');
    }
  }

  async getUserInfoById(getUserInfoDto: GetUserInfoDto) {
    const { id } = getUserInfoDto;
    return await this.authRepository.findById(id);
  }

  async updateUserInfoById(updateUserInfoDto: UpdateUserInfoDto) {
    const { id, password }: { id: number; password: string } =
      updateUserInfoDto;
    const hashedPassword = await this.authRepository.hashPassword(password);
    const body = updateUserInfoDto;
    body['password'] = hashedPassword;
    await this.authRepository.update(id, body);

    return {
      status: 200,
      message: 'update success',
      data: await this.authRepository.findById(id),
    };
  }
}
