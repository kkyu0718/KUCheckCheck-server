import { IsNotEmpty } from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  memberId: number;

  @IsNotEmpty()
  courseId: number;

  @IsNotEmpty()
  isMaster: boolean;

  @IsNotEmpty()
  attendance: object;
}

export class UpdateAttendanceDto {
  @IsNotEmpty()
  memberId: number;

  @IsNotEmpty()
  courseId: number;

  @IsNotEmpty()
  isMaster: boolean;

  @IsNotEmpty()
  attendance: object;
}
