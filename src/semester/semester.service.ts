import { Injectable } from '@nestjs/common';
import { convertTimeZone } from 'src/utils/convertTimeZone';
import { CreateSemesterDto, GetSemesterDto } from './dto/semester.dto';
import { SemesterRepository } from './semester.repository';

@Injectable()
export class SemesterService {
  constructor(private semesterRepository: SemesterRepository) {}

  async createSemester(createSemesterDto: CreateSemesterDto) {
    return await this.semesterRepository.createSemester(createSemesterDto);
  }

  async getSemester(getSemesterDto: GetSemesterDto) {
    const columns = [
      'register_start',
      'register_end',
      'enrollment_start',
      'enrollment_end',
      'active_start',
      'active_end',
    ];
    return convertTimeZone(
      columns,
      await this.semesterRepository.findOneBy(getSemesterDto),
    );
  }
}
