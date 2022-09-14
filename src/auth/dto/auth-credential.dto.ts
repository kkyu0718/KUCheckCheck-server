export enum UserRole {
  MEMBER = 'MEMBER', // index 0
  MANAGER = 'MANAGER', // index 1
}

export class SignUpInfoDto {
  // 필수 입력
  email: string;
  password: string;
  name: string;
  comment: string;

  // 선택사항
  detail_comment?: string;
  github_id?: string;
  instagram_id?: string;
}

export class SignInInfoDto {
  // 필수 입력
  email: string;
  password: string;
}

export class GetUserInfoDto {
  id: number; // 요청하는 정보 id
}

export class UpdateUserInfoDto {
  id: number;
  email: string;
  password: string;
  name: string;
  emoji?: string;
  comment: string;

  detail_comment?: string;
  github_id?: string;
  instagram_id?: string;
}
