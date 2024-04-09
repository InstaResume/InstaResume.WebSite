import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { AuthenticationDetail } from "../action/authActions";

export type RootState = {
  auth: AuthenticationDetail;
};

const rootReducer = combineReducers({ auth: authReducer });

export default rootReducer;
