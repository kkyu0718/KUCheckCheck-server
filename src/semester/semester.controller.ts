import { Controller, UseGuards } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@UseGuards(JwtStrategy)
@Controller('semester')
export class SemesterController {
//   constructor(private semesterService: SemesterService) {}

//   @Post('/')
//   createSemester(@Headers('authorization') accessToken, @Body() body) {
//     const createNoticeDto: CreateNoticeDto = {
//       accessToken,
//       ...body,
//     };
//     return this.noticeService.createNotice(createNoticeDto);
//   }
}
