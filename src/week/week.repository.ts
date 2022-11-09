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

  async findBySemesterId(semesterId: number): Promise<week> {
    return await this.findOneBy({
      semester: {
        id: semesterId,
      },
    });
  }
}
