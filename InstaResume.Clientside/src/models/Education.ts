export interface Education {
  major: string;
  degree: string;
  school: string;
  startDate?: Date;
  endDate?: Date | "Present";
  description: string;
  isCurrentlyStudying: boolean;
}
