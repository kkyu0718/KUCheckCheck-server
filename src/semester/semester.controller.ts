import { Body, Controller, Get, Query, Post, UseGuards } from '@nestjs/common';
import { DecodeToken } from 'src/auth/decode-token.decorator';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CreateSemesterDto, GetSemesterDto } from './dto/semester.dto';
import { SemesterService } from './semester.service';

@UseGuards(JwtStrategy)
@Controller('semester')
export class SemesterController {
  constructor(private semesterService: SemesterService) {}

  @Post('/')
  createSemester(@DecodeToken() decodedToken, @Body() body) {
    const userId = decodedToken['id'];
    const createSemesterDto: CreateSemesterDto = {
      createdBy: userId,
      ...body,
    };
    return this.semesterService.createSemester(createSemesterDto);
  }

  @Get('/')
  getSemester(@Query() params) {
    const getSemesterDto: GetSemesterDto = params;
    return this.semesterService.getSemester(getSemesterDto);
  }
}
