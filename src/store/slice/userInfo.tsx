import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo } from "../thunk/userInfoThunk";

export interface registerState {
  error: string;
  isLoading: boolean;
  true: [];
}

const initialState: registerState = {
  error: "",
  isLoading: false,
  true: [],
};

export const UserInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserInfo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUserInfo.fulfilled.type]: (state, action) => {
      state.error = "";
      state.isLoading = false;
      state.true = action.payload;
    },
    [fetchUserInfo.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});


export const {} = UserInfo.actions;

export default UserInfo.reducer;
