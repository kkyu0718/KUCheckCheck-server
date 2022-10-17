export class CreateAttendanceDto {
  memberId: number;
  courseId: number;
  isMaster: boolean;
  attendance: object;
}

export class GetAttendanceDto {
  courseId: number;
}

export class UpdateAttendanceDto {
  memberId: number;
  courseId: number;
  isMaster: boolean;
  attendance: object;
}
