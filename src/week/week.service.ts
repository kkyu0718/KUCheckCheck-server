import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWeekDto, GetWeekDto, UpdateWeekDto } from './dto/week.dto';
import { WeekRepository } from './week.repository';

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

  async getWeek(getWeekDto: GetWeekDto) {
    return this.weekRepository.getWeek(getWeekDto);
  }
}
