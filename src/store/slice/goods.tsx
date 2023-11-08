import { createSlice } from "@reduxjs/toolkit";

export interface goodsState {
  array: [];
}

const initialState: goodsState = {
  array: [],
};

export const Goods = createSlice({
  name: "Goods",
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
