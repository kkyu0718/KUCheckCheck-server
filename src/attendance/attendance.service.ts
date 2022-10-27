import { CourseRepository } from './../course/course.repository';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { attendance } from './attendance.entity';
import { AttendanceRepository } from './attendance.repository';
import { CreateAttendanceDto, UpdateAttendanceDto } from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    private attendanceRepository: AttendanceRepository,
    private courseRepository: CourseRepository,
  ) {}

  async createAttendance(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<attendance> {
    const courseId = createAttendanceDto.courseId;
    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new UnprocessableEntityException('not_found_course');
    }
    return await this.attendanceRepository.saveAttendance(createAttendanceDto);
  }

  async getAttendance(courseId: number): Promise<attendance[]> {
    return this.attendanceRepository.getMultipleAttendanceByCourseId(courseId);
  }

  async updateAttendance(updateAttendanceDto: UpdateAttendanceDto) {
    const { memberId, courseId, ...body } = updateAttendanceDto;
    const attendance =
      this.attendanceRepository.getOneAttendanceByCourseIdAndMemberId(
        courseId,
        memberId,
      );
    const attendanceId = attendance['id'];
    this.attendanceRepository.updateAttendanceById(attendanceId, body);
    return this.attendanceRepository.getOneAttendanceById(attendanceId);
  }
}
