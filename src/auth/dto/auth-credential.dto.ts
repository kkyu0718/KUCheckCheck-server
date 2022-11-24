import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignUpInfoDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  comment: string;

  @IsOptional()
  detailComment: string;

  @IsOptional()
  githubId: string;

  @IsOptional()
  instagramId: string;
}

export class SignInInfoDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class GetUserInfoDto {
  @IsNotEmpty()
  id: number;
}

export class UpdateUserInfoDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  name: string;

  @IsOptional()
  emoji: string;

  @IsNotEmpty()
  comment: string;

  @IsOptional()
  detailComment: string;

  @IsOptional()
  githubId: string;

  @IsOptional()
  instagramId: string;
}
