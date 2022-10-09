export class CreateSemesterDto {
  created_by: number;
  semester_year: string;
  semester: string;
  register_start: string;
  register_end: string;
  enrollment_start: string;
  enrollment_end: string;
  active_start: string;
  active_end: string;
}

export class GetSemesterDto {
  semester_year: string;
  semester: string;
}
