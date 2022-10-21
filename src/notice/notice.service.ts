import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeRepository } from './notice.repository';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/notice.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeRepository)
    private noticeRepository: NoticeRepository,
  ) {}

  async createNotice(createNoticeDto: CreateNoticeDto) {
    return this.noticeRepository.createNotice(createNoticeDto);
  }

  async getAllNotice() {
    return this.noticeRepository.find();
  }

  async updateNotice(updateNoticeDto: UpdateNoticeDto) {
    return this.noticeRepository.updateNotice(updateNoticeDto);
  }
}
