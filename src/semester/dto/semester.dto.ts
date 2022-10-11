export class CreateSemesterDto {
  createdBy: number;
  semesterYear: string;
  semester: string;
  registerStart: string;
  registerEnd: string;
  enrollmentStart: string;
  enrollmentEnd: string;
  activeStart: string;
  activeEnd: string;
}

export class GetSemesterDto {
  semesterYear: string;
  semester: string;
}
