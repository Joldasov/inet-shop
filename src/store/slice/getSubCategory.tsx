import { createSlice } from "@reduxjs/toolkit";
import { fetchGetSubItems } from "../thunk/SubItemsThunk";

export interface getSubItemState {
  error: string;
  isLoading: boolean;
  status: [];
}

const initialState: getSubItemState = {
  error: "",
  isLoading: false,
  status: [],
};

export const GetSubItem = createSlice({
  name: "getSub",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetSubItems.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchGetSubItems.fulfilled.type]: (state, action) => {
      state.status = action.payload;
      state.error = "";
      state.isLoading = false;
    },
    [fetchGetSubItems.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {} = GetSubItem.actions;

export default GetSubItem.reducer;
