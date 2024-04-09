import { AuthApi, ResumeCreationApi } from "./generated";

const domainName = "http://localhost:5186";

export const authApi = new AuthApi(undefined, domainName);
export const resumeCreationApi = new ResumeCreationApi(undefined, domainName);
