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
    const { semester_year, semester, ...body } = updateWeekDto;
    const semester_data = await this.semesterRepository.findOne({
      where: {
        semester: semester,
        semester_year: semester_year,
      },
    });
    const semester_id = semester_data['id'];
    await this.update(semester_id, body);
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

    return {
      message: '업데이트 성공',
      data: convertTimeZone(columns, await this.findOneBy({ semester_id })),
    };
  }

  async getWeek(getWeekDto: GetWeekDto) {
    const { date } = getWeekDto;
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

    const weeks = await this.find();

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
      }: any = convertTimeZone(columns, week);

      const weekList = { week_1,
        week_2,
        week_3,
        week_4,
        midterm,
        week_5,
        week_6,
        week_7,
        week_8,}
      console.log(weekList)
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
