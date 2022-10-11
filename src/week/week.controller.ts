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
    const date = new Date();
    // if(dateInput == undefined){
    //   date = new Date().toLocaleString('en-us', {timezone: 'Asia/Seoul'})
    // } else{
    //   date = new Date(dateInput).toLocaleString('en-us', {timeZone: 'Asia/Seoul'});
    // }
    return date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
    // if (dateInput !== undefined){
    //   const year = Number(dateInput.slice(0,4));
    //   const month = Number(dateInput.slice(4,6));
    //   const day = Number(dateInput.slice(6,));
    //   console.log(year, month, day)
    //   date = new Date(year, month-1, day);
    // }
    // const date = new Date(2022, 4, 19);
    // const date = new Date(dateInput);
    // console.log("dateInput", dateInput)
    // console.log("new Date" , date);
    // const getWeekDto: GetWeekDto = { date };
    // return this.weekService.getWeek(getWeekDto);
  }
}
