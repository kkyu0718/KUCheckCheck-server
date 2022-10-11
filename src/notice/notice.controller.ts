import {
  Controller,
  Post,
  Body,
  UseGuards,
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
import { DecodeToken } from '../auth/decode-token.decorator';

@UseGuards(JwtStrategy, RolesGuard)
@Controller('notice')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Post('/')
  // @Roles('MANAGER')
  async createNotice(@DecodeToken() decodedToken, @Body() body) {
    const userId = decodedToken['id'];
    const createNoticeDto: CreateNoticeDto = {
      createdBy: userId,
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
    @DecodeToken() decodedToken,
    @Param('id', ParseIntPipe) id: number,
    @Body() body,
  ) {
    const userId = decodedToken['id'];
    const updateNoticeDto: UpdateNoticeDto = {
      noticeId: id,
      updatedBy: userId,
      ...body,
    };
    return this.noticeService.updateNotice(updateNoticeDto);
  }
}
