import { AttendanceService } from './attendance.service';
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
import { IsMasterGuard } from 'src/auth/is-master.guard';

@UseGuards(JwtAuthGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}
  // @UseGuards(IsMasterGuard)
  @Post('/')
  async createAttendance(@Query('courseId') courseId, @Body() body) {
    const createAttendanceDto: CreateAttendanceDto = {
      courseId: courseId,
      ...body,
    };
    return this.attendanceService.createAttendance(createAttendanceDto);
  }

  @Get('/')
  async getAttendance(@Query('courseId', ParseIntPipe) courseId) {
    const getAttendanceDto: GetAttendanceDto = {
      courseId: courseId,
    };
    return this.attendanceService.getAttendance(getAttendanceDto);
  }

  @UseGuards(IsMasterGuard)
  @Put('/')
  async updateAttendance(
    @Query('courseId') courseId,
    @Query('memberId') memberId,
    @Body() body,
  ) {
    const updateAttendanceDto: UpdateAttendanceDto = {
      memberId,
      courseId,
      ...body,
    };
    return this.attendanceService.updateAttendance(updateAttendanceDto);
  }
}
