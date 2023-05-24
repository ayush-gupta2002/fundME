import axios from "axios";
import { publicRequest } from "../requestMethods";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log("response", res.data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch, user) => {
  dispatch(logoutStart());
  try {
    const res = await axios.get("http://localhost:3000/api/auth/logout", {
      headers: { token: `Bearer ${user.currentUser.accessToken}` },
    });
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure());
  }
};
