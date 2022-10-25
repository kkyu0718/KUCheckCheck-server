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
import { CreateAttendanceDto, UpdateAttendanceDto } from './dto/attendance.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { IsMasterGuard } from 'src/auth/is-master.guard';
import { attendance } from './attendance.entity';

@UseGuards(JwtAuthGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}
  // @UseGuards(IsMasterGuard)
  @Post('/')
  async createAttendance(
    @Query('courseId', ParseIntPipe) courseId: number,
    @Body() body,
  ): Promise<attendance> {
    const createAttendanceDto: CreateAttendanceDto = {
      courseId: courseId,
      ...body,
    };
    return this.attendanceService.createAttendance(createAttendanceDto);
  }

  @Get('/')
  async getAttendance(
    @Query('courseId', ParseIntPipe) courseId: number,
  ): Promise<attendance[]> {
    return this.attendanceService.getAttendance(courseId);
  }

  // @UseGuards(IsMasterGuard)
  @Put('/')
  async updateAttendance(
    @Query('courseId', ParseIntPipe) courseId: number,
    @Query('memberId', ParseIntPipe) memberId: number,
    @Body() body,
  ): Promise<attendance> {
    const updateAttendanceDto: UpdateAttendanceDto = {
      memberId,
      courseId,
      ...body,
    };

    return this.attendanceService.updateAttendance(updateAttendanceDto);
  }
}
