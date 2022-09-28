import { AttendanceService } from './attendance.service';
import { JwtStrategy } from './../auth/jwt.strategy';
import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import {
  CreateAttendanceDto,
  GetAttendanceDto,
  UpdateAttendanceDto,
} from './dto/attendance.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}
  @Post('/')
  async createAttendance(@Query('course_id') course_id, @Body() body) {
    const createAttendanceDto: CreateAttendanceDto = {
      course_id: course_id,
      ...body,
    };
    return this.attendanceService.createAttendance(createAttendanceDto);
  }

  @Get('/')
  async getAttendance(@Query('course_id', ParseIntPipe) course_id) {
    const getAttendanceDto: GetAttendanceDto = {
      course_id: course_id,
    };
    return this.attendanceService.getAttendance(getAttendanceDto);
  }

  @Put('/')
  async updateAttendance(
    @Query('course_id') course_id,
    @Query('member_id') member_id,
    @Body() body,
  ) {
    const updateAttendanceDto: UpdateAttendanceDto = {
      member_id,
      course_id,
      ...body,
    };
    return this.attendanceService.updateAttendance(updateAttendanceDto);
  }
}
