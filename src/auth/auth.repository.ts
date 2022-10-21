import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { member } from './member.entity';
import { SignUpInfoDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRepository extends Repository<member> {
  constructor(private dataSource: DataSource, private jwtService: JwtService) {
    super(
      member,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async findByEmail(email: string): Promise<member> {
    return await this.findOneBy({ email });
  }

  async findByEmailOrFail(email: string): Promise<member> {
    return await this.findOneByOrFail({ email });
  }

  async findByIdOrFail(id: number): Promise<member> {
    console.log(await this.findOneOrFail({ where: { id } }));
    return await this.findOneOrFail({ where: { id } });
  }

  async saveUser(signUpInfoDto: SignUpInfoDto): Promise<any> {
    const user = this.create(signUpInfoDto);
    return await this.save(user);
  }
}
