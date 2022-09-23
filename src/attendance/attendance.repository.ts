import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CourseRepository } from 'src/course/course.repository';
import { DataSource, Repository } from 'typeorm';
import { attendance } from './attendance.entity';
import {
  CreateAttendanceDto,
  GetAttendanceDto,
  UpdateAttendanceDto,
} from './dto/attendance.dto';

@Injectable()
export class AttendanceRepository extends Repository<attendance> {
  constructor(
    private dataSource: DataSource,
    private courseRepository: CourseRepository,
  ) {
    super(
      attendance,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createAttendance(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<any> {
    // 같은 member_id & course_id 조합이 있는 경우 error 발생
    try {
      const result = await this.save(createAttendanceDto);
      return result;
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException('existing member_id & course_id 조합');
      } else if (error.code == '23503') {
        throw new InternalServerErrorException(
          '해당 course_id 또는 member_id 가 테이블에 존재하지 않습니다. course 또는 member 등록을 먼저 해주세요',
        );
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getAttendance(getAttendanceDto: GetAttendanceDto): Promise<any> {
    const { course_id } = getAttendanceDto;
    const result = this.createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.course_id', 'course_id')
      .where('attendance.course_id = :course_id', { course_id })
      .getMany();
    return result;
  }

  async updateAttendance(updateAttendanceDto: UpdateAttendanceDto) {
    const { member_id, course_id, ...body } = updateAttendanceDto;
    const attendance = await this.createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.course_id', 'attendance.member_id')
      .where('attendance.course_id = :course_id', { course_id })
      .where('attendance.member_id = :member_id', { member_id })
      .getOne();
    const attendance_id = attendance['id'];
    await this.update({ id: attendance_id }, body);
    return {
      message: '업데이트 성공',
      data: await this.findOneBy({ id: attendance_id }),
    };
  }
}
