export class CreateNoticeDto {
  created_by: number;
  title: string;
  content: string;
}

export class UpdateNoticeDto {
  updated_by: number;
  title: string;
  content: string;
}
