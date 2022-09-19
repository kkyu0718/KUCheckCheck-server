import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
    private jwtService: JwtService,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto) {
    return this.courseRepository.createCourse(createCourseDto);
  }

  async updateCoures() {}
}
