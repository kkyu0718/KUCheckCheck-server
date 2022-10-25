import { Injectable } from '@nestjs/common';
import { CourseRepository } from 'src/course/course.repository';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { attendance } from './attendance.entity';
import { CreateAttendanceDto } from './dto/attendance.dto';

@Injectable()
export class AttendanceRepository extends Repository<attendance> {
  constructor(
    private dataSource: DataSource,
    private courseRepository: CourseRepository,
  ) {
    super(
      attendance,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async saveAttendance(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<attendance> {
    return await this.save(createAttendanceDto);
  }

  async getMultipleAttendanceByCourseId(
    courseId: number,
  ): Promise<attendance[]> {
    return this.createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.courseId', 'courseId')
      .leftJoinAndSelect('attendance.memberId', 'memberId')
      .where('attendance.courseId = :courseId', { courseId })
      .getMany();
  }

  async getOneAttendanceByCourseIdAndMemberId(
    courseId: number,
    memberId: number,
  ): Promise<attendance> {
    return await this.createQueryBuilder('attendance')
    .leftJoinAndSelect('attendance.courseId', 'courseId')
    .leftJoinAndSelect('attendance.memberId', 'memberId')
      .where('attendance.courseId = :courseId', { courseId })
      .andWhere('attendance.memberId = :memberId', { memberId })
      .getOne();
  }

  async updateAttendanceById(
    attendanceId: number,
    body: object,
  ): Promise<UpdateResult> {
    return await this.update({ id: attendanceId }, body);
  }

  async getOneAttendanceById(attendanceId: number) {
    return await this.findOneBy({ id: attendanceId });
  }
}
