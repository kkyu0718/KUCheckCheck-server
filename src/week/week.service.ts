import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWeekDto, UpdateWeekDto } from './dto/week.dto';
import { WeekRepository } from './week.repository';
import { getNowDate } from '../utils/getAsiaTime';
import { isBetweenWeek } from 'src/utils/isBetweenWeek';

@Injectable()
export class WeekService {
  constructor(
    @InjectRepository(WeekRepository)
    private weekRepository: WeekRepository,
  ) {}

  async createWeek(createWeekDto: CreateWeekDto) {
    return this.weekRepository.createWeek(createWeekDto);
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
