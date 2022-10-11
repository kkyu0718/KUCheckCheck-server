import { SemesterRepository } from './../semester/semester.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    const { semesterYear, semester, ...body } = createCourseDto;
    const semesterData = await this.semesterRepository.findOneBy({
      semesterYear,
      semester,
    });

    // 학기 등록이 안 되어 있을 경우 에러 발생
    if (semesterData === null) {
      throw new InternalServerErrorException('학기 등록을 먼저 해주세요');
    }

    const semesterId = semesterData['id'];
    const data = {
      semesterId,
      ...body,
    };
    const result = await this.save(data);
    return result;
  }

  async updateCourse(updateCourseDto: UpdateCourseDto) {
    const { courseId, ...body } = updateCourseDto;
    await this.update(courseId, body);
    return {
      message: '업데이트 성공',
      data: await this.findOneBy({ id: courseId }),
    };
  }
}
