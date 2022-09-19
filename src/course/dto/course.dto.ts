export class CreateCourseDto {
  type: number;
  difficulty: string;
  require_time: number;
  title: string;
  language: object;
  detail_stack?: object;
  introduction?: string;
  goal?: string;
  progress_date?: string;
  max_number?: number;
  place?: string;
  notice?: string;
  curriculum?: object;
}

export class UpdateCourseDto {
  course_id: number;
  type: number;
  difficulty: string;
  require_time: number;
  title: string;
  language: object;
  detail_stack?: object;
  introduction?: string;
  goal?: string;
  progress_date?: string;
  max_number?: number;
  place?: string;
  notice?: string;
  curriculum?: object;
}
