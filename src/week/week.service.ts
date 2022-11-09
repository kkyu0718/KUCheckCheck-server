import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateWeekDto,
  GetCheckWeekOfDateDto,
  UpdateWeekDto,
} from './dto/week.dto';
import { WeekRepository } from './week.repository';
import { getNowDate } from '../utils/getAsiaTime';
import { isBetweenWeek } from 'src/utils/isBetweenWeek';
import { SemesterRepository } from 'src/semester/semester.repository';
import { week } from './week.entity';

@Injectable()
export class WeekService {
  constructor(
    @InjectRepository(WeekRepository)
    private weekRepository: WeekRepository,
    private semesterRepository: SemesterRepository,
  ) {}

  async createWeek(createWeekDto: CreateWeekDto): Promise<week> {
    const { semesterYear, semester, ...body } = createWeekDto;
    const semesterData = await this.semesterRepository.findOneBySemesterOrFail(
      semester,
      semesterYear,
    );

    if (!semesterData) {
      throw new UnprocessableEntityException(
        `학기 ${semesterYear}-${semester}가 등록되어 있지 않습니다`,
      );
    }

    const data = {
      semester: semesterData,
      ...body,
    };

    return await this.weekRepository.save(data);
  }

  async updateWeek(updateWeekDto: UpdateWeekDto): Promise<week> {
    const { semesterYear, semester, ...body } = updateWeekDto;
    const semesterData = await this.semesterRepository.findOneBySemesterOrFail(
      semester,
      semesterYear,
    );

    const semesterId = semesterData.id;

    await this.weekRepository.update({ semester: { id: semesterId } }, body);

    return await this.weekRepository.findBySemesterId(semesterId);
  }

  async getCheckWeekOfDate(
    getCheckWeekOfDate: GetCheckWeekOfDateDto,
  ): Promise<object> {
    const { dateInput, semesterYear, semester } = getCheckWeekOfDate;
    let date = dateInput;

    if (!dateInput) {
      date = getNowDate();
    }

    const semesterData = await this.semesterRepository.findOneBySemesterOrFail(
      semester,
      semesterYear,
    );

    const semesterId = semesterData.id;

    if (!semesterData) {
      return {
        week: null,
        message: '해당 주차는 존재하지 않습니다.',
      };
    }

    const weeks = await this.weekRepository.findBySemesterId(semesterId);

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
      week: null,
      message: '해당 주차는 존재하지 않습니다.',
    };
  }
}
