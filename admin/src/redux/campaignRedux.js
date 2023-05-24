import { createSlice } from "@reduxjs/toolkit";

export const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    campaigns: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GETALL
    getCampaignStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCampaignSuccess: (state, action) => {
      state.isFetching = false;
      state.campaigns = action.payload;
    },
    getCampaignFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteCampaignStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCampaignSuccess: (state, action) => {
      state.isFetching = false;
      state.campaigns.splice(
        state.campaigns.findIndex((item) => item._id === action.payload._id),
        1
      );
    },
    deleteCampaignFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCampaignStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCampaignSuccess: (state, action) => {
      state.isFetching = false;
      state.campaigns[
        state.campaigns.findIndex(
          (campaign) => campaign._id == action.payload.id
        )
      ] = action.payload.campaign;
    },
    updateCampaignFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addCampaignStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCampaignSuccess: (state, action) => {
      state.isFetching = false;
      state.campaigns.push(action.payload);
    },
    addCampaignFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //REMOVE CAMPAIGN REDUX
    logoutCampaignSuccess: (state) => {
      state.campaigns = [];
      state.error = false;
      state.isFetching = false;
    },
  },
});

export const {
  getCampaignStart,
  getCampaignFailure,
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
} = campaignSlice.actions;

export default campaignSlice.reducer;
