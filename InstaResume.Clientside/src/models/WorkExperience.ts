export interface WorkExperience {
  jobTitle: string;
  position: string;
  employer: string;
  startDate?: Date;
  endDate?: Date | "Present";
  description: string;
  isCurrentlyWorking: boolean;
  city: string;
}
