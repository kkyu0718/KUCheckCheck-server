import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { CreateAttendanceDto, GetAttendanceDto, UpdateAttendanceDto } from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private attendanceRepository: AttendanceRepository) {}
  async createAttendance(createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceRepository.createAttendance(createAttendanceDto);
  }

  async getAttendance(getAttendanceDto: GetAttendanceDto) {
    return this.attendanceRepository.getAttendance(getAttendanceDto);
  }

  async updateAttendance(updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceRepository.updateAttendance(updateAttendanceDto);
  }
}
