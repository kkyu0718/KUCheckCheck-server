import { Injectable } from '@nestjs/common';
import { attendance } from './attendance.entity';
import { AttendanceRepository } from './attendance.repository';
import { CreateAttendanceDto, UpdateAttendanceDto } from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private attendanceRepository: AttendanceRepository) {}
  async createAttendance(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<attendance> {
    return await this.attendanceRepository.saveAttendance(createAttendanceDto);
    // return this.attendanceRepository.createAttendance(createAttendanceDto);
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
