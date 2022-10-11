export class CreateCourseDto {
  memberId: number;
  semesterYear: string;
  semester: string;
  type: number;
  difficulty: string;
  requireTime: number;
  title: string;
  language: object;
  detailStack?: object;
  introduction?: string;
  goal?: string;
  progressDate?: string;
  maxNumber?: number;
  place?: string;
  notice?: string;
  curriculum?: object;
}

export class UpdateCourseDto {
  courseId: number;
  type: number;
  difficulty: string;
  requireTime: number;
  title: string;
  language: object;
  detailStack?: object;
  introduction?: string;
  goal?: string;
  progressDate?: string;
  maxNumber?: number;
  place?: string;
  notice?: string;
  curriculum?: object;
}
