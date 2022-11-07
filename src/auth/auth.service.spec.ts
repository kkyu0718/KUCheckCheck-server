import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { member } from './member.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { describe } from 'node:test';
import { AuthRepository } from './auth.repository';
import { SignUpInfoDto } from './dto/auth-credential.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: AuthRepository; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, AuthRepository]).compile();

    authService = module.get<AuthService>(AuthService);
    authRepository = module.get<AuthRepository>(AuthRepository)
  });

  describe('회원가입', () => {
    it('회원 가입 성공', () => {
      const userId = 1;
      const requestDto: SignUpInfoDto = {
        email: "user@domain.com",
        password: "password1234",
        name: "김유저",
        comment: "코멘트 예시"
      }
      jest.spyOn(userRepository, )
    });
    it('이메일 중복 시 회원 가입 실패', () => {
      expect(service).toBeDefined();
    });
  })
});
