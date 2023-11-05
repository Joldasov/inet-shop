import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../services/service";
// import axios from "axios";

export const fetchCatalog = createAsyncThunk(
  "Get/Catalog",
  async (__, thunkAPI) => {
    try {
      const { data } = await $api.get("/categories");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
export interface getItemState {
  error: string;
  isLoading: boolean;
  status: [];
}

const initialState: getItemState = {
  error: "",
  isLoading: false,
  status: [],
};

export const Catalog = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCatalog.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchCatalog.fulfilled.type]: (state, action) => {
      state.status = action.payload;
      state.error = "";
      state.isLoading = false;
    },
    [fetchCatalog.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = Catalog.actions;

export default Catalog.reducer;
