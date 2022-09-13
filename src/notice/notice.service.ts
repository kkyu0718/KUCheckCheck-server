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

  async createNotice(accessToken, body: CreateNoticeDto) {
    const token = accessToken.replace('Bearer ', '');
    const decodedToken = await this.jwtService.decode(token);
    const email = decodedToken['email'];
    const userInfo = await this.memberRepository.findOneBy({ email });
    const userId = userInfo.id;
    const data = {
      created_by: userId,
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
