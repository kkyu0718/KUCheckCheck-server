import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { member } from './member.entity';
import * as bcrypt from 'bcryptjs';
import { SignUpInfoDto } from './dto/auth-credential.dto';

@Injectable()
export class MemberRepository extends Repository<member> {
  constructor(private dataSource: DataSource) {
    super(
      member,
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
      const savedInfo = await this.save(user);
      return savedInfo;
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException('existing_email');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
