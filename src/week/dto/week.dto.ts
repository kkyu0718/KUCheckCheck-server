export class CreateWeekDto {
  week_1: Date;
  week_2: Date;
  week_3: Date;
  week_4: Date;
  midterm: Date;
  week_5: Date;
  week_6: Date;
  week_7: Date;
  week_8: Date;
  semester_year: string;
  semester: string;
  created_by: number;
  updated_by: number;
}

export class UpdateWeekDto {
  week_1: Date;
  week_2: Date;
  week_3: Date;
  week_4: Date;
  midterm: Date;
  week_5: Date;
  week_6: Date;
  week_7: Date;
  week_8: Date;
  semester_year: string;
  semester: string;
  updated_by: number;
}

export class GetWeekDto {
    date: Date;
}