import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SemesterRepository } from 'src/semester/semester.repository';
import { convertTimeZone } from 'src/utils/convertTimeZone';
import { isBetweenWeek } from 'src/utils/isBetweenWeek';
import { DataSource, Repository,  } from 'typeorm';
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
      const columns = [
        'week_1',
        'week_2',
        'week_3',
        'week_4',
        'midterm',
        'week_5',
        'week_6',
        'week_7',
        'week_8',
      ];
      return convertTimeZone(columns, result);
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
    const semesterId = semester_data['id'];
    await this.update(semesterId, body);
    const columns = [
      'week1',
      'week2',
      'week3',
      'week4',
      'midterm',
      'week5',
      'week6',
      'week7',
      'week8',
    ];

    return {
      message: '업데이트 성공',
      data: convertTimeZone(columns, await this.findOneBy({ semesterId })),
    };
  }

  async getWeek(getWeekDto: GetWeekDto) {
    const { date } = getWeekDto;
    const columns = [
      'week1',
      'week2',
      'week3',
      'week4',
      'midterm',
      'week5',
      'week6',
      'week7',
      'week8',
    ];

    const weeks = await this.find();

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
      }: any = convertTimeZone(columns, week);

      const weekList = { week1,
        week2,
        week3,
        week4,
        midterm,
        week5,
        week6,
        week7,
        week8,}

      for (let elem in weekList){
        if (isBetweenWeek(date, weekList[elem]) == true) {
          return {
            week: elem
          }
        }
      }   
    }
    return {
      message: "해당 주차는 존재하지 않습니다."
    }
  }
}
