import {
  AuthApi,
  DescriptionGeneratorApi,
  ResumeCreationApi,
} from "./generated";

export const domainName =
  import.meta.env.VITE_API_URL ?? "http://localhost:5186";

export const authApi = new AuthApi(undefined, domainName);
export const resumeCreationApi = new ResumeCreationApi(undefined, domainName);
export const descriptionGeneratorApi = new DescriptionGeneratorApi(
  undefined,
  domainName
);
