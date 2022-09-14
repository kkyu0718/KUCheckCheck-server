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
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/notice.dto';
import { NoticeService } from './notice.service';

@UseGuards(JwtStrategy, RolesGuard)
@Controller('notice')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Post('/')
  @Roles('MEMBER')
  createNotice(@Headers('authorization') accessToken, @Body() body) {
    const createNoticeDto: CreateNoticeDto = {
      accessToken,
      ...body,
    };
    return this.noticeService.createNotice(createNoticeDto);
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
