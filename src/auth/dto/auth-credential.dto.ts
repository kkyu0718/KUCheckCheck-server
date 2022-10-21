export class SignUpInfoDto {
  // 필수 입력
  email: string;
  password: string;
  name: string;
  comment: string;

  // 선택사항
  detailComment?: string;
  githubId?: string;
  instagramId?: string;
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

  detailComment?: string;
  githubId?: string;
  instagramId?: string;
}
