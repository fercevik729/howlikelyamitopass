export interface Professor {
  id: string;
  name: string;
  tags: string[];
  rating: number;
  wouldRepeat: number;
  difficulty: number;
  comments: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  units: number;
  offered: CourseOffer[];
}

export interface CourseOffer {
  id: string;
  quarter: string;
  courseId: string;
  professors: Professor[];
}
