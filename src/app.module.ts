import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthRepository } from './auth/auth.repository';
import { typeORMConfig } from './configs/typeorm.config';
import { NoticeModule } from './notice/notice.module';
import { CourseModule } from './course/course.module';
import { SemesterModule } from './semester/semester.module';
import { AttendanceModule } from './attendance/attendance.module';
import { WeekModule } from './week/week.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeORMConfig),
    NoticeModule,
    CourseModule,
    SemesterModule,
    AttendanceModule,
    WeekModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthRepository,
    JwtStrategy,
    PassportModule,
    JwtService,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AppModule {}
