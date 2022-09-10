import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { MemberRepository } from './auth/member.repository';
import { typeORMConfig } from './configs/typeorm.config';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(typeORMConfig), NoticeModule],
  controllers: [AppController],
  providers: [AppService, MemberRepository, JwtStrategy, PassportModule],
  exports: [JwtStrategy, PassportModule],
})
export class AppModule {}
