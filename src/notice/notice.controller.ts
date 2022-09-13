import {
  Controller,
  Post,
  Body,
  UseGuards,
  Headers,
  Get,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/notice.dto';
import { NoticeService } from './notice.service';

@UseGuards(JwtStrategy)
@Controller('notice')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Post('/')
  createNotice(@Headers() headers, @Body() body: CreateNoticeDto) {
    const accessToken = headers['authorization'];
    return this.noticeService.createNotice(accessToken, body);
  }

  @Get('/')
  getAllNotice() {
    return this.noticeService.getAllNotice();
  }

  @Put('/:id')
  updateOneNotice(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateNoticeDto,
  ) {
    return this.noticeService.updateOneNotice(id, body);
  }
}
