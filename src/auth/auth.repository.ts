import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { member } from './member.entity';
import * as bcrypt from 'bcryptjs';
import { SignUpInfoDto } from './dto/auth-credential.dto';
import { JwtSignOptions, JwtService } from '@nestjs/jwt';
import { UserRole } from './role/user.role';

@Injectable()
export class AuthRepository extends Repository<member> {
  constructor(private dataSource: DataSource, private jwtService: JwtService) {
    super(
      member,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async hashPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(
    dbPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(dbPassword, inputPassword);
  }

  async createAccessToken(user: member, option: JwtSignOptions) {
    const {
      id,
      email,
      name,
      role,
    }: { id: number; email: string; name: string; role: UserRole } = user;
    const payload: { id: number; email: string; name: string; role: UserRole } =
      {
        id,
        email,
        name,
        role,
      };
    const accessToken: string = await this.jwtService.sign(payload, option);
    return { accessToken };
  }

  async findByEmail(email: string): Promise<member> {
    return await this.findOneBy({ email });
  }

  async findById(id: number): Promise<member> {
    return await this.findOneBy({ id });
  }

  async saveUser(signUpInfoDto: SignUpInfoDto): Promise<any> {
    const user = this.create(signUpInfoDto);
    return await this.save(user);
  }
}
