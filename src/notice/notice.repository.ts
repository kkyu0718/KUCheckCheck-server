import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
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
}
