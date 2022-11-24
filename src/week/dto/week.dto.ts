import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWeekDto {
  @IsNotEmpty()
  week1: Date;

  @IsNotEmpty()
  week2: Date;

  @IsNotEmpty()
  week3: Date;

  @IsNotEmpty()
  week4: Date;

  @IsNotEmpty()
  midterm: Date;

  @IsNotEmpty()
  week5: Date;

  @IsNotEmpty()
  week6: Date;

  @IsNotEmpty()
  week7: Date;

  @IsNotEmpty()
  week8: Date;

  @IsNotEmpty()
  semesterYear: string;

  @IsNotEmpty()
  semester: string;

  @IsNotEmpty()
  createdBy: number;

  @IsNotEmpty()
  updatedBy: number;
}

export class UpdateWeekDto {
  @IsNotEmpty()
  week1: Date;

  @IsNotEmpty()
  week2: Date;

  @IsNotEmpty()
  week3: Date;

  @IsNotEmpty()
  week4: Date;

  @IsNotEmpty()
  midterm: Date;

  @IsNotEmpty()
  week5: Date;

  @IsNotEmpty()
  week6: Date;

  @IsNotEmpty()
  week7: Date;

  @IsNotEmpty()
  week8: Date;

  @IsNotEmpty()
  semesterYear: string;

  @IsNotEmpty()
  semester: string;

  @IsNotEmpty()
  updatedBy: number;
}

export class GetCheckWeekOfDateDto {
  @IsOptional()
  dateInput: string;
  @IsNotEmpty()
  semesterYear: string;
  @IsNotEmpty()
  semester: string;
}
