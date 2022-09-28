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
    const { semester_year, semester, ...body } = createWeekDto;
    const semester_data = await this.semesterRepository.findOne({
      where: {
        semester: semester,
        semester_year: semester_year,
      },
    });

    // 등록되지 않은 학기일 경우 에러 발생
    if (semester_data === null) {
      throw new InternalServerErrorException(
        `학기 ${semester_year}-${semester}가 등록되어 있지 않습니다`,
      );
    }

    const semester_id = semester_data['id'];
    const data = {
      semester_id,
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
    const { semester_year, semester, ...body } = updateWeekDto;
    const semester_data = await this.semesterRepository.findOne({
      where: {
        semester: semester,
        semester_year: semester_year,
      },
    });
    const semester_id = semester_data['id'];
    await this.update(semester_id, body);

    return {
      message: '업데이트 성공',
      data: await this.findOneBy({ semester_id }),
    };
  }

  async getWeek(getWeekDto: GetWeekDto) {
    const { date } = getWeekDto;
    const weeks = await this.find();

    // console.log('현재 날짜', date);
    for (const week of weeks) {
      const {
        week_1,
        week_2,
        week_3,
        week_4,
        midterm,
        week_5,
        week_6,
        week_7,
        week_8,
      } = week;
      if (date >= week_1 && date < week_2) {
        return { week: '1', range: `${week_1} ~ ${week_2}` };
      } else if (date >= week_2 && date < week_3) {
        return { week: '2', range: `${week_2} ~ ${week_3}` };
      } else if (date >= week_3 && date < week_4) {
        return { week: '3', range: `${week_3} ~ ${week_4}` };
      } else if (date >= week_4 && date < midterm) {
        return { week: '4', range: `${week_4} ~ ${midterm}` };
      } else if (date >= midterm && date < week_5) {
        return { week: 'midterm', range: `${midterm} ~ ${week_5}` };
      } else if (date >= week_5 && date < week_6) {
        return { week: '5', range: `${week_5} ~ ${week_6}` };
      } else if (date >= week_6 && date < week_7) {
        return { week: '6', range: `${week_6} ~ ${week_7}` };
      } else if (date >= week_7 && date < week_8) {
        return { week: '7', range: `${week_7} ~ ${week_8}` };
      } else if (
        date >= week_8 &&
        date < new Date(week_8.setDate(week_8.getDate() + 7))
      ) {
        return { week: '8', range: `${week_8} ~ ${new Date(week_8.setDate(week_8.getDate() + 7))}` };
      }
    }
  }
}
