import { createSlice } from "@reduxjs/toolkit";
import { fetchBuy } from "../thunk/BuyThunk";
import { sliceNames } from "../../utils/const/SliceNames";

export interface BuyState {
  error: [];
  isLoading: boolean;
  status: [];
}

const initialState: BuyState = {
  error: [],
  isLoading: false,
  status: [],
};

export const Buy = createSlice({
  name: sliceNames.USER_BUY,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBuy.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchBuy.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload;
    },
    [fetchBuy.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {} = Buy.actions;

export default Buy.reducer;
