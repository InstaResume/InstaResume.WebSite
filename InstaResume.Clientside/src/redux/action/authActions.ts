import { LOGIN, LOGOUT } from "./authActionTypes";

export interface AuthenticationDetail {
  token: string;
  isAuthenticated: boolean;
  userImageUrl: string;
  userName: string;
}

export const login = (authDetail: AuthenticationDetail) => ({
  type: LOGIN,
  payload: authDetail,
});

export const logout = () => ({ type: LOGOUT, payload: null });
