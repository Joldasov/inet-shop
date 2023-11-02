import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../services/servise";
// import axios from "axios";

interface IText {
  id: string;
}

export const fetchGetItem = createAsyncThunk(
  "Get/get",
  async ({ id }: IText, thunkAPI) => {
    try {
      const {data} = await $api.get(`/goods/item/${id}`);
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
export interface getItemState {
  error: string;
  isLoading: boolean;
  status: [];
  text: string;
  smt: []
}

const initialState: getItemState = {
  error: "",
  isLoading: false,
  status: [],
  text: "",
  smt: []
};

export const GetItem = createSlice({
  name: "get",
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [fetchGetItem.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchGetItem.fulfilled.type]: (state, action) => {
      state.status = action.payload
      state.smt = action.payload
      state.error = "";
      state.isLoading = false;
    },
    [fetchGetItem.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { } = GetItem.actions;

export default GetItem.reducer;
