import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateSemesterDto } from './dto/semester.dto';
import { semester } from './semester.entity';
import { convertTimeZone } from 'src/utils/convertTimeZone';

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
    try {

      const savedData = await this.save(createSemesterDto);
      const { id, created_by } = savedData;
      const columns = [
        'register_start',
        'register_end',
        'enrollment_start',
        'enrollment_end',
        'active_start',
        'active_end',
      ];
      await this.update(id, { updated_by: created_by });
      return convertTimeZone(columns, await this.findOneBy({ id }));
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('해당 학기가 이미 존재합니다');
      }
    }
  }
}
