import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { notice } from './notice.entity';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/notice.dto';

@Injectable()
export class NoticeRepository extends Repository<notice> {
  constructor(private dataSource: DataSource) {
    super(
      notice,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createNotice(createNoticeDto: CreateNoticeDto): Promise<any> {
    const savedData = await this.save(createNoticeDto);
    const { id, created_by } = savedData;
    await this.update(id, { updated_by: created_by }); // updated_by -> created_by 와 동일하게 저장

    return this.findOneBy({ id });
  }

  async updateNotice(updateNoticeDto: UpdateNoticeDto) {
    const { notice_id, ...body } = updateNoticeDto;
    await this.update(notice_id, body);
    return {
      message: '업데이트 성공',
      data: await this.findOneBy({ id: notice_id }),
    };
  }
}
