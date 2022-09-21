import { Injectable, PipeTransform } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ParseTokenPipe implements PipeTransform {
  // inject any dependency
  constructor(private jwtService: JwtService) {}

  async transform(accessToken: any) {
    const token = accessToken.replace('Bearer ', '');
    return await this.jwtService.decode(token);
  }
}
