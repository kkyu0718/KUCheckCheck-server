import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DecodeToken } from 'src/auth/decode-token.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateWeekDto, GetWeekDto, UpdateWeekDto } from './dto/week.dto';
import { WeekService } from './week.service';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

@Controller('week')
@UseGuards(RolesGuard)
export class WeekController {
  constructor(private weekService: WeekService) {}

  @UseGuards(JwtAuthGuard)
  // @Roles('MANAGER')
  @Post('/')
  createWeek(
    @DecodeToken() decodedToken,
    @Body() body,
    @Query('semesterYear') semesterYear,
    @Query('semester') semester,
  ) {
    const user = decodedToken['id'];
    const createWeekDto: CreateWeekDto = {
      ...body,
      semesterYear,
      semester,
      createdBy: user,
      updatedBy: user,
    };
    return this.weekService.createWeek(createWeekDto);
  }

  @UseGuards(JwtAuthGuard)
  // @Roles('MANAGER')
  @Put('/')
  updateWeek(
    @DecodeToken() decodedToken,
    @Body() body,
    @Query('semesterYear') semesterYear,
    @Query('semester') semester,
  ) {
    const user = decodedToken['id'];
    const updateWeekDto: UpdateWeekDto = {
      ...body,
      semesterYear,
      semester,
      updatedBy: user,
    };
    return this.weekService.updateWeek(updateWeekDto);
  }

  @Get('/')
  getWeek(@Query('date') dateInput) {
    let date;
    if (dateInput == undefined){
      dayjs.extend(utc);
      dayjs.extend(timezone)
      date = dayjs.utc().tz('Asia/Seoul').format('YYYY-MM-DD');
    } else{
      date = dateInput
    }

    const getWeekDto: GetWeekDto = {
      date,
    };

    return this.weekService.getWeek(getWeekDto);
  }
}
