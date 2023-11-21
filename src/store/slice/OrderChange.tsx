import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderChange } from "../thunk/ChangeOrderThunk";


export interface orderChange {
  error: string;
  isLoading: boolean;
  status: [];
}

const initialState: orderChange = {
  error: "",
  isLoading: false,
  status: [],
};

export const OrderChange = createSlice({
  name: 'orderChange',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrderChange.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchOrderChange.fulfilled.type]: (state, action) => {
      state.status = action.payload;
      state.error = "";
      state.isLoading = false;
    },
    [fetchOrderChange.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {} = OrderChange.actions;

export default OrderChange.reducer;