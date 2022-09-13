import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateNoticeDto } from './dto/notice.dto';
import { notice } from './notice.entity';

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
    const data = await this.save(createNoticeDto);
    const { id, created_by } = data;
    await this.update(id, { updated_by: created_by });
    return this.findOneBy({ id });
  }

  async updateOneNotice(id, body) {
    await this.update(id, body);
    return {
      message: '업데이트 성공',
      data: await this.findOneBy({ id }),
    };
  }
}
