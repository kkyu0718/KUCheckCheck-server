import {
  Body,
  Controller,
  Query,
  Param,
  Post,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { DecodeToken } from 'src/auth/decode-token.decorator';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';

@UseGuards(JwtStrategy)
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('/')
  createCourse(@DecodeToken() decodedToken, @Body() body, @Query() params) {
    const { semesterYear, semester } = params;
    const userId = decodedToken['id'];
    const createCourseDto: CreateCourseDto = {
      memberId: userId,
      semesterYear,
      semester,
      ...body,
    };
    return this.courseService.createCourse(createCourseDto);
  }

  @Put('/:id')
  updateCourse(@Param('id', ParseIntPipe) id: number, @Body() body) {
    const updateCourseDto: UpdateCourseDto = {
      courseId: id,
      ...body,
    };
    return this.courseService.updateCourse(updateCourseDto);
  }
}
