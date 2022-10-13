import { Injectable } from '@nestjs/common';
import { CreateSemesterDto, GetSemesterDto } from './dto/semester.dto';
import { SemesterRepository } from './semester.repository';

@Injectable()
export class SemesterService {
  constructor(private semesterRepository: SemesterRepository) {}

  async createSemester(createSemesterDto: CreateSemesterDto) {
    return await this.semesterRepository.createSemester(createSemesterDto);
  }
  async getSemester(getSemesterDto: GetSemesterDto) {
    console.log(new Date());
    return await this.semesterRepository.findOneBy(getSemesterDto);
  }
}
