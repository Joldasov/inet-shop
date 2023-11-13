import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../services/Service";

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