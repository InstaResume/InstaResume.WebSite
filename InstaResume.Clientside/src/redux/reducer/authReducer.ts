import { AuthenticationDetail } from "../action/authActions";
import { LOGIN, LOGOUT } from "../action/authActionTypes";

const initialState: AuthenticationDetail = {
  isAuthenticated: false,
  userImageUrl: "",
  userName: "",
  token: "",
};

const authReducer = (
  state = initialState,
  action: { type: string; payload: AuthenticationDetail }
) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return state;
    default:
      return state;
  }
};

export default authReducer;
