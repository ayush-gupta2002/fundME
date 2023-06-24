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
import { eraseCart, loadCart } from "./cartRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    try {
      const foundCart = await axios.get(
        `http://localhost:3000/api/carts/${res.data._doc._id}`,
        { headers: { token: `Bearer ${res.data.accessToken}` } }
      );
      console.log("foundCart", foundCart);
      if (foundCart.data) {
        dispatch(loadCart(foundCart.data));
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch, user, cart) => {
  dispatch(logoutStart());
  try {
    try {
      console.log("cart products", cart);
      const newCart = {
        campaignId: cart.products,
        userId: user.currentUser._doc._id,
        amount: cart.total,
        quantity: cart.quantity,
      };
      await axios.post("http://localhost:3000/api/carts", newCart, {
        headers: { token: `Bearer ${user.currentUser.accessToken}` },
      });
      dispatch(eraseCart());
    } catch (err) {
      dispatch(logoutFailure());
    }
    await axios.get("http://localhost:3000/api/auth/logout", {
      headers: { token: `Bearer ${user.currentUser.accessToken}` },
    });
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure());
  }
};
