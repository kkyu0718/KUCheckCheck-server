import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { week } from './week.entity';

@Injectable()
export class WeekRepository extends Repository<week> {
  constructor(private dataSource: DataSource) {
    super(
      week,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async findOneIdDesc(): Promise<week> {
    const [weeks] = await this.find({
      order: {
        id: 'desc',
      },
      take: 1,
    });
    return weeks;
  }
}
