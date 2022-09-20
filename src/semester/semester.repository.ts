import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateSemesterDto } from './dto/semester.dto';
import { semester } from './semester.entity';

@Injectable()
export class SemesterRepository extends Repository<semester> {
  constructor(private dataSource: DataSource) {
    super(
      semester,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createSemester(createSemesterDto: CreateSemesterDto) {
    const savedData = await this.save(createSemesterDto);
    const { id, created_by } = savedData;
    await this.update(id, { updated_by: created_by });
    return this.findOneBy({ id });
  }
}
