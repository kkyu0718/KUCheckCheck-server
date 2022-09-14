import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeRepository } from './notice.repository';
import { JwtService } from '@nestjs/jwt';
import { MemberRepository } from 'src/auth/member.repository';
import { CreateNoticeDto, UpdateNoticeDto } from './dto/notice.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeRepository)
    private noticeRepository: NoticeRepository,
    private memberRepository: MemberRepository,
    private jwtService: JwtService,
  ) {}

  async createNotice(createNoticeDto: CreateNoticeDto) {
    const { accessToken, ...body } = createNoticeDto;
    const token = accessToken.replace('Bearer ', '');
    const decodedToken = await this.jwtService.decode(token);
    const id = decodedToken['id'];
    const data = {
      created_by: id,
      ...body,
    };
    return this.noticeRepository.createNotice(data);
  }

  async getAllNotice() {
    return this.noticeRepository.find();
  }

  async updateOneNotice(id: number, body: UpdateNoticeDto) {
    return this.noticeRepository.updateOneNotice(id, body);
  }
}
