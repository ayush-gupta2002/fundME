import axios from "axios";
import { publicRequest } from "../requestMethods";
import {
  getCampaignFailure,
  getCampaignStart,
  getCampaignSuccess,
  deleteCampaignFailure,
  deleteCampaignSuccess,
  deleteCampaignStart,
  updateCampaignFailure,
  updateCampaignSuccess,
  updateCampaignStart,
  addCampaignFailure,
  addCampaignSuccess,
  addCampaignStart,
  logoutCampaignSuccess,
} from "./campaignRedux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
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

export const getCampaigns = async (dispatch, user) => {
  dispatch(getCampaignStart());
  try {
    const res = await axios.get(
      `http://localhost:3000/api/campaigns/user/${user._doc._id}`,
      { headers: { token: `Bearer ${user.accessToken}` } }
    );
    dispatch(getCampaignSuccess(res.data));
  } catch (err) {
    dispatch(getCampaignFailure());
  }
};

export const deleteCampaigns = async (dispatch, campaignID, user) => {
  console.log(campaignID, user);
  dispatch(deleteCampaignStart());
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/campaigns/${campaignID}`,
      { headers: { token: `Bearer ${user.accessToken}` } }
    );
    dispatch(deleteCampaignSuccess(res.data));
  } catch (err) {
    dispatch(deleteCampaignFailure());
  }
};

export const updateCampaign = async (dispatch, campaign, user) => {
  // console.log(campaignID, user);
  dispatch(updateCampaignStart());
  try {
    const res = await axios.put(
      `http://localhost:3000/api/campaigns/${campaign._id}`,
      campaign,
      { headers: { token: `Bearer ${user.accessToken}` } }
    );
    dispatch(updateCampaignSuccess({ id: campaign._id, campaign: res.data }));
  } catch (err) {
    dispatch(updateCampaignFailure());
  }
};

export const addCampaign = async (dispatch, campaign, user) => {
  // console.log(campaignID, user);
  dispatch(addCampaignStart());
  try {
    const res = await axios.post(
      `http://localhost:3000/api/campaigns`,
      { campaign: campaign, img: campaign.img },
      { headers: { token: `Bearer ${user.accessToken}` } }
    );
    dispatch(addCampaignSuccess(res.data));
  } catch (err) {
    dispatch(addCampaignFailure());
  }
};

export const logout = async (dispatch, user) => {
  dispatch(logoutStart());
  try {
    const res = await axios.get("http://localhost:3000/api/auth/logout", {
      headers: { token: `Bearer ${user.currentUser.accessToken}` },
    });
    dispatch(logoutSuccess());
    dispatch(logoutCampaignSuccess());
  } catch (err) {
    dispatch(logoutFailure());
  }
};
