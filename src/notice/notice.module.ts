import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeController } from './notice.controller';
import { NOTICE } from './notice.entity';
import { NoticeService } from './notice.service';

@Module({
  imports: [TypeOrmModule.forFeature([NOTICE])],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
