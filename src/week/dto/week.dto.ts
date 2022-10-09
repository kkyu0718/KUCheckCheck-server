export class CreateWeekDto {
  week_1: string;
  week_2: string;
  week_3: string;
  week_4: string;
  midterm: string;
  week_5: string;
  week_6: string;
  week_7: string;
  week_8: string;
  semester_year: string;
  semester: string;
  created_by: number;
  updated_by: number;
}

export class UpdateWeekDto {
  week_1: string;
  week_2: string;
  week_3: string;
  week_4: string;
  midterm: string;
  week_5: string;
  week_6: string;
  week_7: string;
  week_8: string;
  semester_year: string;
  semester: string;
  updated_by: number;
}

export class GetWeekDto {
  date?: string;
}
