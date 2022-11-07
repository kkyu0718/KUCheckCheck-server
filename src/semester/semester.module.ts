import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthRepository } from 'src/auth/auth.repository';
import { SemesterController } from './semester.controller';
import { semester } from './semester.entity';
import { SemesterRepository } from './semester.repository';
import { SemesterService } from './semester.service';

@Module({
  imports: [TypeOrmModule.forFeature([semester]), AuthModule],
  controllers: [SemesterController],
  providers: [SemesterService, AuthRepository, JwtService, SemesterRepository],
})
export class SemesterModule {}
