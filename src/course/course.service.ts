import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from './course.repository';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto) {
    return this.courseRepository.createCourse(createCourseDto);
  }

  async updateCourse(updateCourseDto: UpdateCourseDto) {
    return this.courseRepository.updateCourse(updateCourseDto);
  }
}
