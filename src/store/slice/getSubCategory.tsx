import { createSlice } from "@reduxjs/toolkit";
import { fetchGetSubItems } from "../thunk/SubItemsThunk";
import { sliceNames } from "../../utils/const/SliceNames";

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
  name: sliceNames.USER_GETSUBITEM,
  initialState,
  reducers: {
    setSortRating: (state) =>{
      const sort = state.status?.data?.sort((a: any,b: any) => +b.rating - +a.rating)
      state.status = sort
    },
    setSortLowPrice: (state) =>{
      const sort = state.status?.data?.sort((a: any,b: any) => +b.price - +a.price)
      state.status = sort
    }
  },
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

export const {setSortRating, setSortLowPrice} = GetSubItem.actions;

export default GetSubItem.reducer;
