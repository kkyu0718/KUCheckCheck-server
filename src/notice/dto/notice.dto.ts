export class CreateNoticeDto {
  accessToken: string;
  created_by: number;
  title: string;
  content: string;
}

export class UpdateNoticeDto {
  updated_by: number;
  title: string;
  content: string;
}
