import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SemesterRepository } from 'src/semester/semester.repository';
import { WeekController } from './week.controller';
import { week } from './week.entity';
import { WeekRepository } from './week.repository';
import { WeekService } from './week.service';

@Module({
  imports: [TypeOrmModule.forFeature([week]), AuthModule],
  controllers: [WeekController],
  providers: [WeekService, WeekRepository, SemesterRepository, JwtService],
})
export class WeekModule {}
