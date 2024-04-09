export interface Project {
  title: string;
  description: string;
  startDate?: Date;
  endDate?: Date | "Present";
  links: string[];
}
