export class CreateNoticeDto {
  created_by: number;
  title: string;
  content: string;
}

export class UpdateNoticeDto {
  notice_id: number;
  updated_by: number;
  title: string;
  content: string;
}
