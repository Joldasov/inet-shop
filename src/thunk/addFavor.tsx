import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../services/service";
export const fetchInFavor = createAsyncThunk(
    "Add/Favorities",
    async (id, thunkAPI) => {
      try {
        const data = await $authHost.post("/users/favorites", {
          id: id,
        });
        console.log(id);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error as Error);
      }
    }
  );