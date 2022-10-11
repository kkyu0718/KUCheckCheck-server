export class CreateSemesterDto {
  createdBy: number;
  semesterYear: string;
  semester: string;
  registerStart: Date;
  registerEnd: Date;
  enrollmentStart: Date;
  enrollmentEnd: Date;
  activeStart: Date;
  activeEnd: Date;
}

export class GetSemesterDto {
  semesterYear: string;
  semester: string;
}
