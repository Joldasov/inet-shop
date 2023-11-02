import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../services/servise";
// import axios from "axios";

interface IText {
  category: string;
  id: string
}

export const fetchGetSubItems = createAsyncThunk(
  "Get/subCategory",
  async ({ category, id }: IText, thunkAPI) => {
    try {
      const data = await $api.get(`http://localhost:3004/goods/category/${category}/${id}?start=startPosition&count=20&sortBy=itemField&reverse=boolean`);
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
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
  reducers: {
   
  },
  extraReducers: {
    [fetchGetSubItems.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchGetSubItems.fulfilled.type]: (state, action) => {
      state.status = action.payload
      state.error = "";
      state.isLoading = false;
    },
    [fetchGetSubItems.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { } = GetSubItem.actions;

export default GetSubItem.reducer;
