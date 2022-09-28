import { JwtService } from '@nestjs/jwt';
import { attendance } from 'src/attendance/attendance.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { AuthModule } from 'src/auth/auth.module';
import { AttendanceRepository } from './attendance.repository';
import { CourseRepository } from 'src/course/course.repository';
import { SemesterRepository } from 'src/semester/semester.repository';
import { course } from 'src/course/course.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([attendance, course]), AuthModule],
  controllers: [AttendanceController],
  providers: [
    AttendanceService,
    AttendanceRepository,
    JwtService,
    SemesterRepository,
    CourseRepository,
    JwtAuthGuard,
  ],
})
export class AttendanceModule {}
