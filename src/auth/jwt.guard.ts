import {
  Injectable,
  HttpException,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import * as config from 'config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  // 헤더에 포함되어 온 토큰값의 유효성 검사
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    if (authorization === undefined) {
      throw new HttpException('Token 전송 안됨', HttpStatus.UNAUTHORIZED);
    }

    const token = authorization.replace('Bearer ', '');
    request.user = this.validateToken(token);
    return true;
  }

  validateToken(token: string) {
    const dbConfig = config.get('jwt');
    const secretKey = dbConfig.secret;

    try {
      const verify = this.jwtService.verify(token, { secret: secretKey });
      return verify;
    } catch (e) {
      console.log(e.message);
      switch (e.message) {
        // 토큰에 대한 오류를 판단합니다.
        case 'secret or public key must be provided':
          throw new HttpException('시크릿 키가 주어지지 않았습니다.', 401);
        case 'jwt expired':
          throw new HttpException('토큰이 만료되었습니다.', 401);

        default:
          throw new HttpException('서버 오류입니다. 오류 발생 위치 jwt.guard.ts', 500);
      }
    }
  }
}
