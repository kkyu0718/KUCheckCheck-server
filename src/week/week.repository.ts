import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SemesterRepository } from 'src/semester/semester.repository';
import { DataSource, Repository, Timestamp } from 'typeorm';
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
      if (error.code === '23505') {
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
    const weeks = await this.find();

    // console.log('현재 날짜', date);
    for (const week of weeks) {
      const {
        week1,
        week2,
        week3,
        week4,
        midterm,
        week5,
        week6,
        week7,
        week8,
      } = week;
      if (date >= week1 && date < week2) {
        return { week: '1', range: `${week1} ~ ${week2}`, now: date };
      } else if (date >= week2 && date < week3) {
        return { week: '2', range: `${week2} ~ ${week3}`, now: date };
      } else if (date >= week3 && date < week4) {
        return { week: '3', range: `${week3} ~ ${week4}`, now: date };
      } else if (date >= week4 && date < midterm) {
        return { week: '4', range: `${week4} ~ ${midterm}`, now: date };
      } else if (date >= midterm && date < week5) {
        return { week: 'midterm', range: `${midterm} ~ ${week5}`, now: date };
      } else if (date >= week5 && date < week6) {
        return { week: '5', range: `${week5} ~ ${week6}`, now: date };
      } else if (date >= week6 && date < week7) {
        return { week: '6', range: `${week6} ~ ${week7}`, now: date };
      } else if (date >= week7 && date < week8) {
        return { week: '7', range: `${week7} ~ ${week8}`, now: date };
      } else if (
        date >= week8 &&
        date < new Date(week8.setDate(week8.getDate() + 7))
      ) {
        return {
          week: '8',
          range: `${week8} ~ ${new Date(week8.setDate(week8.getDate() + 7))}`,
          now: date,
        };
      }
    }
  }
}
