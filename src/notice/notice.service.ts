import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeRepository } from './notice.repository';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/notice.dto';
import { notice } from './notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeRepository)
    private noticeRepository: NoticeRepository,
  ) {}

  async createNotice(createNoticeDto: CreateNoticeDto): Promise<notice> {
    return await this.noticeRepository.save(createNoticeDto);
  }

  async getAllNotice(): Promise<notice[]> {
    return this.noticeRepository.find({ where: { isShow: true } });
  }

  async updateNotice(updateNoticeDto: UpdateNoticeDto): Promise<notice> {
    const { noticeId, ...body } = updateNoticeDto;

    await this.noticeRepository.update(noticeId, body);

    const updateNotice = await this.noticeRepository.findById(noticeId);

    return updateNotice;
  }
}
