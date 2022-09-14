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

  async createNotice(data): Promise<any> {
    const savedData = await this.save(data);
    const { id, created_by } = savedData;
    await this.update(id, { updated_by: created_by }); // updated_by -> created_by 와 동일하게 저장

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
