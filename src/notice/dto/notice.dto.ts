export class CreateNoticeDto {
  createdBy: number;
  title: string;
  content: string;
}

export class UpdateNoticeDto {
  noticeId: number;
  updatedBy: number;
  title: string;
  content: string;
}
