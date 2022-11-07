import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SemesterRepository } from 'src/semester/semester.repository';
import { isBetweenWeek } from 'src/utils/isBetweenWeek';
import { DataSource, Repository } from 'typeorm';
import { CreateWeekDto, GetWeekDto, UpdateWeekDto } from './dto/week.dto';
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

  async createWeek(createWeekDto: CreateWeekDto) {
    const { semesterYear, semester, ...body } = createWeekDto;
    const semesterData = await this.semesterRepository.findOne({
      where: {
        semester: semester,
        semesterYear: semesterYear,
      },
    });

    // 등록되지 않은 학기일 경우 에러 발생
    if (semesterData === null) {
      throw new InternalServerErrorException(
        `학기 ${semesterYear}-${semester}가 등록되어 있지 않습니다`,
      );
    }

    const semesterId = semesterData['id'];
    const data = {
      semesterId,
      ...body,
    };

    try {
      const result = await this.save(data);

      return result;
    } catch (error) {
      console.log(error);
      if (error.errno === '1062') {
        throw new ConflictException('해당 학기의 week table이 이미 존재합니다');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
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

  async getWeek(getWeekDto: GetWeekDto) {
    const { date } = getWeekDto;

    const [weeks] = await this.find({
      order: {
        id: 'DESC',
      },
      take: 1,
    });

    const weekObject = {
      week1: weeks.week1,
      week2: weeks.week2,
      week3: weeks.week3,
      week4: weeks.week4,
      midterm: weeks.midterm,
      week5: weeks.week5,
      week6: weeks.week6,
      week7: weeks.week7,
      week8: weeks.week8,
    };

    for (const elem in weekObject) {
      if (isBetweenWeek(date, weekObject[elem]) == true) {
        return {
          week: elem,
        };
      }
    }

    return {
      message: '해당 주차는 존재하지 않습니다.',
    };
  }
}
