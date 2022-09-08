import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { SignUpInfoDto } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(
      User,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createUser(signUpInfoDto: SignUpInfoDto): Promise<any> {
    const { password } = signUpInfoDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    signUpInfoDto['password'] = hashedPassword; // 비밀번호 암호화된 것으로 변경

    const user = this.create(signUpInfoDto);

    // 같은 username 이 있을 경우 error 발생
    try {
      await this.save(user);
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException('Existing Email');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  // async saveRefreshToken(user: User, refreshToken: string){
  //     this.update(user.id, {
  //         refreshToken : refreshToken
  //     })
  // }

  // async removeRefreshToken(user: User){
  //     this.update(user.id, {
  //         refreshToken : null
  //     })
  // }
}
