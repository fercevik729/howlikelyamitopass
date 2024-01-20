export interface CourseOffer {
  quarter: string;
  professors: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  units: number;
  offered: CourseOffer[];
}