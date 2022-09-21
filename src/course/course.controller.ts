import { Body, Controller, Query, Post, Put, UseGuards } from '@nestjs/common';
import { DecodeToken } from 'src/auth/decode-token.decorator';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/course.dto';

@UseGuards(JwtStrategy)
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('/')
  createCourse(@DecodeToken() decodedToken, @Body() body, @Query() params) {
    const { semester_year, semester } = params;
    const user_id = decodedToken['id'];
    const createCourseDto: CreateCourseDto = {
      member_id: user_id,
      semester_year,
      semester,
      ...body,
    };
    return this.courseService.createCourse(createCourseDto);
  }

  @Put('/:id')
  updateCourse() {}
}
