export enum UserRole {
  MEMBER = 'MEMBER',
  MANAGER = 'MANAGER',
}

export class SignUpInfoDto {
  // 필수 입력
  email: string;
  password: string;
  name: string;
  comment: string;

  // 선택사항
  detail_comment?: string;
  github_link?: string;
  instagram_link?: string;
}

export class SignInInfoDto {
  // 필수 입력
  email: string;
  password: string;
}

export class MyInfoDto {
  accessToken: string;
  // accessToken : name, role, email
}

export class UpdateUserInfoDto {
  email: string;
  password: string;
  name: string;
  emoji?: string;
  comment: string;

  detail_comment?: string;
  github_link?: string;
  instagram_link?: string;
}
