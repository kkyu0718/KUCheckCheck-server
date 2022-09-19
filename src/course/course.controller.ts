import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/course.dto';

@UseGuards(JwtStrategy)
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('/')
  createCourse(@Body(ValidationPipe) createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @Put('/:id')
  updateCourse() {}
}
