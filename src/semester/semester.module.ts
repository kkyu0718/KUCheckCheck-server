import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MemberRepository } from 'src/auth/member.repository';
import { SemesterController } from './semester.controller';
import { semester } from './semester.entity';
import { SemesterService } from './semester.service';

@Module({
  imports: [TypeOrmModule.forFeature([semester]), AuthModule],
  controllers: [SemesterController],
  providers: [SemesterService, MemberRepository, JwtService],
})
export class SemesterModule {}
