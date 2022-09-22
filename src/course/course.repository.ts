import { SemesterRepository } from './../semester/semester.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MemberRepository } from 'src/auth/member.repository';
import { DataSource, Repository } from 'typeorm';
import { course } from './course.entity';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';

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

    // 학기 등록이 안 되어 있을 경우 에러 발생
    if (semester_data === null) {
      throw new InternalServerErrorException('학기 등록을 먼저 해주세요');
    }

    const semester_id = semester_data['id'];
    const data = {
      semester_id,
      ...body,
    };
    const result = await this.save(data);
    return result;
  }

  async updateCourse(updateCourseDto: UpdateCourseDto) {
    const { course_id, ...body } = updateCourseDto;
    await this.update(course_id, body);
    return {
      message: '업데이트 성공',
      data: await this.findOneBy({ id: course_id }),
    };
  }
}
