import { SemesterRepository } from './../semester/semester.repository';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CourseController } from './course.controller';
import { course } from './course.entity';
import { CourseRepository } from './course.repository';
import { CourseService } from './course.service';

@Module({
  imports: [TypeOrmModule.forFeature([course]), AuthModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository, JwtService, SemesterRepository],
})
export class CourseModule {}
