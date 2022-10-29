export class CreateWeekDto {
  week1: Date;
  week2: Date;
  week3: Date;
  week4: Date;
  midterm: Date;
  week5: Date;
  week6: Date;
  week7: Date;
  week8: Date;
  semesterYear: string;
  semester: string;
  createdBy: number;
  updatedBy: number;
}

export class UpdateWeekDto {
  week1: Date;
  week2: Date;
  week3: Date;
  week4: Date;
  midterm: Date;
  week5: Date;
  week6: Date;
  week7: Date;
  week8: Date;
  semesterYear: string;
  semester: string;
  updatedBy: number;
}

export class GetCheckWeekOfDateDto {
  dateInput?: string;
  semesterYear: string;
  semester: string;
}
