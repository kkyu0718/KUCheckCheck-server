import { SemesterRepository } from './../semester/semester.repository';
import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/auth/member.repository';
import { DataSource, Repository } from 'typeorm';
import { course } from './course.entity';
import { CreateCourseDto } from './dto/course.dto';

@Injectable()
export class CourseRepository extends Repository<course> {
  constructor(
    private dataSource: DataSource,
    private semesterRepository: SemesterRepository,
  ) {
    super(
      course,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createCourse(createCourseDto: CreateCourseDto) {
    const { semester_year, semester, ...body } = createCourseDto;
    const semester_data = await this.semesterRepository.findOneBy({
      semester_year,
      semester,
    });
    const semester_id = semester_data['id'];
    const data = {
      semester_id,
      ...body,
    };
    console.log(data);
    const result = await this.save(data);
    return result;
  }

  async updateCourse() {}
}
