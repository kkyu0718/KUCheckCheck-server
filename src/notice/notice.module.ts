import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthRepository } from 'src/auth/auth.repository';
import { NoticeController } from './notice.controller';
import { notice } from './notice.entity';
import { NoticeRepository } from './notice.repository';
import { NoticeService } from './notice.service';

@Module({
  imports: [TypeOrmModule.forFeature([notice]), AuthModule],
  controllers: [NoticeController],
  providers: [NoticeService, AuthRepository, NoticeRepository, JwtService],
})
export class NoticeModule {}
