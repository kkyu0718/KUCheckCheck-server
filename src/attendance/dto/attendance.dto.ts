export class CreateAttendanceDto {
  member_id: number;
  course_id: number;
  is_master: number;
  attendance: object;
}

export class GetAttendanceDto {
  course_id: number;
}

export class UpdateAttendanceDto {
  member_id: number;
  course_id: number;
  is_master: number;
  attendance: object;
}
