import { JwtService } from '@nestjs/jwt';
import { attendance } from 'src/attendance/attendance.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { AuthModule } from 'src/auth/auth.module';
import { AttendanceRepository } from './attendance.repository';

@Module({
  imports: [TypeOrmModule.forFeature([attendance]), AuthModule],
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceRepository, JwtService],
})
export class AttendanceModule {}
