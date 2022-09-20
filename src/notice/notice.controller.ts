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
  ValidationPipe,
} from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/notice.dto';
import { NoticeService } from './notice.service';
import { JwtService } from '@nestjs/jwt';
import { DecodeToken } from '../auth/decode-token.decorator';

@UseGuards(JwtStrategy, RolesGuard)
@Controller('notice')
export class NoticeController {
  constructor(
    private noticeService: NoticeService,
    private jwtService: JwtService,
  ) {}

  @Post('/')
  // @Roles('MANAGER')
  async createNotice(@DecodeToken() decodedToken, @Body() body) {
    const user_id = decodedToken['id'];
    const createNoticeDto: CreateNoticeDto = {
      created_by: user_id,
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
    const user_id = decodedToken['id'];
    const updateNoticeDto: UpdateNoticeDto = {
      notice_id: id,
      updated_by: user_id,
      ...body,
    };
    return this.noticeService.updateNotice(updateNoticeDto);
  }
}
