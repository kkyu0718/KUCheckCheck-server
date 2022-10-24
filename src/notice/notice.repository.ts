import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { notice } from './notice.entity';
import { CreateNoticeDto } from './dto/notice.dto';

@Injectable()
export class NoticeRepository extends Repository<notice> {
  constructor(private dataSource: DataSource) {
    super(
      notice,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createNotice(createNoticeDto: CreateNoticeDto): Promise<notice> {
    const createNotice = this.create(createNoticeDto);

    return await this.save(createNotice);
  }
}
