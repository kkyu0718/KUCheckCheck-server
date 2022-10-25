import { Injectable } from '@nestjs/common';
import { SemesterRepository } from 'src/semester/semester.repository';
import { DataSource, Repository } from 'typeorm';
import { UpdateWeekDto } from './dto/week.dto';
import { week } from './week.entity';

@Injectable()
export class WeekRepository extends Repository<week> {
  constructor(
    private dataSource: DataSource,
    private semesterRepository: SemesterRepository,
  ) {
    super(
      week,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async updateWeek(updateWeekDto: UpdateWeekDto) {
    const { semesterYear, semester, ...body } = updateWeekDto;
    const semesterData = await this.semesterRepository.findOne({
      where: {
        semester: semester,
        semesterYear: semesterYear,
      },
    });
    const semesterId = semesterData['id'];
    await this.update(semesterId, body);

    return {
      message: '업데이트 성공',
      data: await this.findOneBy({ semesterId }),
    };
  }
}
