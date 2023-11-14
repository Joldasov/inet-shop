import { createSlice } from "@reduxjs/toolkit";
import { fetchGetItem } from "../thunk/GetItemThunk";
import { sliceNames } from "../../utils/const/SliceNames";
export interface getItemState {
  error: string;
  isLoading: boolean;
  status: [];
  text: string;
  smt: [];
}

const initialState: getItemState = {
  error: "",
  isLoading: false,
  status: [],
  text: "",
  smt: [],
};

export const GetItem = createSlice({
  name: sliceNames.USER_GETITEM,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetItem.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchGetItem.fulfilled.type]: (state, action) => {
      state.status = action.payload;
      state.smt = action.payload;
      state.error = "";
      state.isLoading = false;
    },
    [fetchGetItem.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {} = GetItem.actions;

export default GetItem.reducer;
