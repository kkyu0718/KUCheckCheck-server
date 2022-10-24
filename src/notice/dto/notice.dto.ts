export class CreateNoticeDto {
  title: string;
  content: string;
  isShow: boolean;
  createdBy: number;
  updatedBy: number;
}

export class UpdateNoticeDto {
  noticeId: number;
  title?: string;
  isShow?: boolean;
  content?: string;
  updatedBy: number;
}
