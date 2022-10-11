export class CreateWeekDto {
  week1: string;
  week2: string;
  week3: string;
  week4: string;
  midterm: string;
  week5: string;
  week6: string;
  week7: string;
  week8: string;
  semesterYear: string;
  semester: string;
  createdBy: number;
  updatedBy: number;
}

export class UpdateWeekDto {
  week1: string;
  week2: string;
  week3: string;
  week4: string;
  midterm: string;
  week5: string;
  week6: string;
  week7: string;
  week8: string;
  semesterYear: string;
  semester: string;
  updatedBy: number;
}

export class GetWeekDto {
  date?: string;
}
