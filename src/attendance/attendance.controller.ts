import { AttendanceService } from './attendance.service';
import { JwtStrategy } from './../auth/jwt.strategy';
import { Controller, UseGuards } from '@nestjs/common';

@UseGuards(JwtStrategy)
@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}
}
