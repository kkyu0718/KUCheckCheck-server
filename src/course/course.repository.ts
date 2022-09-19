import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { course } from './course.entity';
import { CreateCourseDto } from './dto/course.dto';

@Injectable()
export class CourseRepository extends Repository<course> {
  constructor(private dataSource: DataSource) {
    super(
      course,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createCourse(createCourseDto: CreateCourseDto) {
    const result = await this.save(createCourseDto);
    return result;
  }

  async updateCourse() {}
}
