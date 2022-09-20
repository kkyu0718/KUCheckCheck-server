import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { DecodeToken } from 'src/auth/decode-token.decorator';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CreateSemesterDto, GetSemesterDto } from './dto/semester.dto';
import { SemesterService } from './semester.service';

@UseGuards(JwtStrategy)
@Controller('semester')
export class SemesterController {
  constructor(private semesterService: SemesterService) {}

  @Post('/')
  createSemester(@DecodeToken() decodedToken, @Body(ValidationPipe) body) {
    const user_id = decodedToken['id'];
    const createSemesterDto: CreateSemesterDto = {
      created_by: user_id,
      ...body,
    };
    return this.semesterService.createSemester(createSemesterDto);
  }

  @Get('/:semester_year-:semester')
  getSemester(@Param() params) {
    const getSemesterDto: GetSemesterDto = params;
    return this.semesterService.getSemester(getSemesterDto);
  }
}
