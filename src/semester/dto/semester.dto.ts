export class CreateSemesterDto {
  created_by: number;
  semester_year: string;
  semester: string;
  register_start: Date;
  register_end: Date;
  enrollment_start: Date;
  enrollment_end: Date;
  active_start: Date;
  active_end: Date;
}

export class GetSemesterDto {
  semester_year: string;
  semester: string;
}
