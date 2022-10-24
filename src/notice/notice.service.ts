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
    return await this.noticeRepository.createNotice(createNoticeDto);
  }

  async getAllNotice() {
    return this.noticeRepository.find({ where: { isShow: true } });
  }

  async updateNotice(updateNoticeDto: UpdateNoticeDto) {
    const { noticeId, ...body } = updateNoticeDto;

    await this.noticeRepository.update(noticeId, body);

    const updateNotice = await this.noticeRepository.findOneBy({
      id: noticeId,
    });

    return updateNotice;
  }
}
