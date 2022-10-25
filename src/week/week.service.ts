import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWeekDto, UpdateWeekDto } from './dto/week.dto';
import { WeekRepository } from './week.repository';
import { getNowDate } from '../utils/getAsiaTime';
import { isBetweenWeek } from 'src/utils/isBetweenWeek';
import { SemesterRepository } from 'src/semester/semester.repository';

@Injectable()
export class WeekService {
  constructor(
    @InjectRepository(WeekRepository)
    private weekRepository: WeekRepository,
    private semesterRepository: SemesterRepository,
  ) {}

  async createWeek(createWeekDto: CreateWeekDto) {
    const { semesterYear, semester, ...body } = createWeekDto;
    const semesterData = await this.semesterRepository.findOne({
      where: {
        semester: semester,
        semesterYear: semesterYear,
      },
    });

    if (!semesterData) {
      throw new InternalServerErrorException(
        `학기 ${semesterYear}-${semester}가 등록되어 있지 않습니다`,
      );
    }

    const semesterId = semesterData.id;
    const data = {
      semesterId,
      ...body,
    };

    return await this.weekRepository.save(data);
  }

  async updateWeek(updateWeekDto: UpdateWeekDto) {
    return this.weekRepository.updateWeek(updateWeekDto);
  }

  async getWeek(dateInput): Promise<object> {
    let date = dateInput;

    if (!dateInput) {
      date = getNowDate();
    }

    const [weeks] = await this.weekRepository.find({
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
