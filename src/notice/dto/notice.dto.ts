import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNoticeDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  isShow: boolean;

  @IsOptional()
  createdBy: number;

  @IsOptional()
  updatedBy: number;
}

export class UpdateNoticeDto {
  @IsOptional()
  noticeId: number;

  @IsOptional()
  title: string;

  @IsOptional()
  isShow: boolean;

  @IsOptional()
  content: string;

  @IsOptional()
  updatedBy: number;
}
