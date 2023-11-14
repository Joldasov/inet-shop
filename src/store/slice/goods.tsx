import { createSlice } from "@reduxjs/toolkit";
import { sliceNames } from "../../utils/const/SliceNames";

export interface goodsState {
  array: [];
}

const initialState: goodsState = {
  array: [],
};

export const Goods = createSlice({
  name: sliceNames.USER_GOODS,
  initialState,
  reducers: {
    addArray: (state, action) => {
      state.array = action.payload;
    },
  },
  extraReducers: {},
});


export const { addArray } = Goods.actions;

export default Goods.reducer;
