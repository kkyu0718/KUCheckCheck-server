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
      if (error.errno == '1062') {
        throw new ConflictException('existing member_id & courseId 조합');
      } else if (error.errno == '1452') {
        throw new InternalServerErrorException(
          '등록하려는 course_id 또는 member_id 가 테이블에 존재하지 않습니다. course 또는 member 등록을 먼저 해주세요',
        );
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getAttendance(getAttendanceDto: GetAttendanceDto): Promise<any> {
    const { courseId } = getAttendanceDto;
    const result = this.createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.courseId', 'courseId')
      .where('attendance.courseId = :courseId', { courseId })
      .getMany();
    return result;
  }

  async updateAttendance(updateAttendanceDto: UpdateAttendanceDto) {
    const { memberId, courseId, ...body } = updateAttendanceDto;
    const attendance = await this.createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.courseId', 'attendance.memberId')
      .where('attendance.courseId = :courseId', { courseId })
      .andWhere('attendance.memberId = :memberId', { memberId })
      .getOne();
    const attendanceId = attendance['id'];
    await this.update({ id: attendanceId }, body);
    return {
      message: '업데이트 성공',
      data: await this.findOneBy({ id: attendanceId }),
    };
  }
}
