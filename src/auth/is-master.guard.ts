import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import * as config from 'config';
import { AttendanceRepository } from 'src/attendance/attendance.repository';

@Injectable()
export class IsMasterGuard extends AuthGuard('is-master') {
  constructor(
    private jwtService: JwtService,
    private attendanceRepository: AttendanceRepository,
  ) {
    super();
  }

  // 헤더에 포함되어 온 토큰값의 유효성 검사
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    if (authorization === undefined) {
      throw new HttpException('Token 전송 안됨', HttpStatus.UNAUTHORIZED);
    }
    const { courseId } = request.query;
    const token = authorization.replace('Bearer ', '');
    return this.validateToken(token, courseId);
  }

  // token의 id를 통해 db에 접근하여 is_master인지 확인
  async validateToken(token: string, courseId: number) {
    const dbConfig = config.get('jwt');
    const secretKey = dbConfig.secret;

    try {
      const member = this.jwtService.decode(token, secretKey);
      const memberId = member['id'];
      const attendance = await this.attendanceRepository
        .createQueryBuilder('attendance')
        .leftJoinAndSelect('attendance.courseId', 'courseId')
        .leftJoinAndSelect('attendance.memberId', 'memberId')
        .where('attendance.memberId = :memberId', { memberId: memberId })
        .andWhere('attendance.courseId = :courseId', { courseId: courseId })
        .getOneOrFail();

      const isMaster = attendance['isMaster'];

      if (isMaster == 0) {
        console.log(`memberId ${memberId} 는 master가 아닙니다`);
        return false;
      } else {
        console.log(`memberId ${memberId} 는 master가 맞습니다`);
        return true;
      }
    } catch (e) {
      console.log(e.message);
      switch (e.message) {
        // 토큰에 대한 오류를 판단합니다.
        case 'secret or public key must be provided':
          throw new HttpException('시크릿 키가 주어지지 않았습니다.', 401);
        case 'jwt expired':
          throw new HttpException('토큰이 만료되었습니다.', 401);
        case 'Could not find any entity of type "attendance" matching: [object Object]':
          throw new HttpException(
            '접근하는 유저가 course에 등록되어 있지 않습니다',
            403,
          );
        default:
          throw new HttpException(
            '서버 오류입니다. 오류 발생 위치 is-master.guard.ts',
            500,
          );
      }
    }
  }
}
