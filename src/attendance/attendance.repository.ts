import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { attendance } from './attendance.entity';

@Injectable()
export class AttendanceRepository extends Repository<attendance> {
  constructor(private dataSource: DataSource) {
    super(
      attendance,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  //   async createNotice(createNoticeDto: CreateNoticeDto): Promise<any> {
  //     const savedData = await this.save(createNoticeDto);
  //     const { id, created_by } = savedData;
  //     await this.update(id, { updated_by: created_by }); // updated_by -> created_by 와 동일하게 저장

  //     return this.findOneBy({ id });
  //   }

  //   async updateNotice(updateNoticeDto: UpdateNoticeDto) {
  //     const { notice_id, ...body } = updateNoticeDto;
  //     await this.update(notice_id, body);
  //     return {
  //       message: '업데이트 성공',
  //       data: await this.findOneBy({ id: notice_id }),
  //     };
  //   }
}
