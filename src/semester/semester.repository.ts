import { ConflictException, Injectable } from '@nestjs/common';
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
    try {
      const savedData = await this.save(createSemesterDto);
      const { id, createdBy } = savedData;
      await this.update(id, { updatedBy: createdBy });

      return await this.findOneBy({ id });
    } catch (error) {
      console.log(error);
      if (error.errno === '1062') {
        throw new ConflictException('해당 학기가 이미 존재합니다');
      }
    }
  }
}
