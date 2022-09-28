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
    @Query('semester_year') semester_year,
    @Query('semester') semester,
  ) {
    const user = decodedToken['id'];
    const createWeekDto: CreateWeekDto = {
      ...body,
      semester_year,
      semester,
      created_by: user,
      updated_by: user,
    };
    return this.weekService.createWeek(createWeekDto);
  }

  @UseGuards(JwtAuthGuard)
  // @Roles('MANAGER')
  @Put('/')
  updateWeek(
    @DecodeToken() decodedToken,
    @Body() body,
    @Query('semester_year') semester_year,
    @Query('semester') semester,
  ) {
    const user = decodedToken['id'];
    const updateWeekDto: UpdateWeekDto = {
      ...body,
      semester_year,
      semester,
      updated_by: user,
    };
    return this.weekService.updateWeek(updateWeekDto);
  }

  @Get('/')
  getWeek(@Query('date') dateInput) {
    // let date = new Date();
    let xmlHttpRequest;
    if (window.XMLHttpRequest) {
      // code for Firefox, Mozilla, IE7, etc.
      xmlHttpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // code for IE5, IE6
      xmlHttpRequest = new ActiveXObject('Microsoft.XMLHTTP');
    } else {
      return;
    }

    xmlHttpRequest.open('HEAD', window.location.href.toString(), false);
    xmlHttpRequest.setRequestHeader('ContentType', 'text/html');
    xmlHttpRequest.send('');

    const serverDate = xmlHttpRequest.getResponseHeader('Date');
    const date = new Date(serverDate);
    return date;
    // if (dateInput !== undefined){
    //   const year = Number(dateInput.slice(0,4));
    //   const month = Number(dateInput.slice(4,6));
    //   const day = Number(dateInput.slice(6,));
    //   console.log(year, month, day)
    //   date = new Date(year, month-1, day);
    // }
    // date = new Date(2022, 4, 19)
    console.log(date);
    const getWeekDto: GetWeekDto = { date };
    return this.weekService.getWeek(getWeekDto);
  }
}
