export interface ResumeCreationRequest {
  replacements: Replacement[];
}

export interface Replacement {
  findText: string;
  replaceText: string;
}
