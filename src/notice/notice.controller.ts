import { Controller, Post, Body, UseGuards, Get, Put, Param, ParseIntPipe } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/notice.dto';
import { NoticeService } from './notice.service';
import { DecodeToken } from '../auth/decode-token.decorator';
import { notice } from './notice.entity';

@UseGuards(JwtStrategy, RolesGuard)
@Controller('notice')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Post('/')
  // @Roles('MANAGER')
  async createNotice(@DecodeToken() decodedToken, @Body() createNoticeDto: CreateNoticeDto): Promise<notice> {
    const userId = decodedToken['id'];
    createNoticeDto = {
      ...createNoticeDto,
      createdBy: userId,
      updatedBy: userId,
    };
    return this.noticeService.createNotice(createNoticeDto);
  }

  @Get('/')
  getAllNotice(): Promise<notice[]> {
    return this.noticeService.getAllNotice();
  }

  @Put('/:id')
  updateOneNotice(
    @DecodeToken() decodedToken,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ): Promise<notice> {
    const userId = decodedToken['id'];
    updateNoticeDto = {
      ...updateNoticeDto,
      noticeId: id,
      updatedBy: userId,
    };
    return this.noticeService.updateNotice(updateNoticeDto);
  }
}
