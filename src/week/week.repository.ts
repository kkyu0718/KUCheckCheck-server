import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SemesterRepository } from 'src/semester/semester.repository';
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

  async updateWeek(updateWeekDto: UpdateWeekDto){
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
      data: await this.findOneBy({semester_id})
    }

  }

  async getWeek(getWeekDto: GetWeekDto) {
    let { date } = getWeekDto;
    if (date === null) {
      // 1. 현재 시간(Locale)
      const curr = new Date();
      console.log('현재시간(Locale) : ' + curr + '<br>'); // 현재시간(Locale) : Tue May 31 2022 09:00:30

      // 2. UTC 시간 계산
      const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

      // 3. UTC to KST (UTC + 9시간)
      const KR_TIME_DIFF = 9 * 60 * 60 * 1000; //한국 시간(KST)은 UTC시간보다 9시간 더 빠르므로 9시간을 밀리초 단위로 변환.
      date = new Date(utc + KR_TIME_DIFF); //UTC 시간을 한국 시간으로 변환하기 위해 utc 밀리초 값에 9시간을 더함.
    }

    const week = await this.createQueryBuilder('week').getMany();
    console.log(week);
  }
}
