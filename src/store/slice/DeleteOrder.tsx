import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderDelete } from "../thunk/DeleteOrderThunk";


export interface deleteOrdre {
  error: string;
  isLoading: boolean;
  status: [];
}

const initialState: deleteOrdre = {
  error: "",
  isLoading: false,
  status: [],
};

export const DeleteOrder = createSlice({
  name: 'deleteOrdre',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrderDelete.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchOrderDelete.fulfilled.type]: (state, action) => {
      state.status = action.payload;
      state.error = "";
      state.isLoading = false;
    },
    [fetchOrderDelete.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {} = DeleteOrder.actions;

export default DeleteOrder.reducer;