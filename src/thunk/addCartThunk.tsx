import { createAsyncThunk} from "@reduxjs/toolkit";
import { $authHost } from "../services/service";

export const fetchCart = createAsyncThunk("Auth/Cart", async (id, thunkAPI) => {
  try {
    const data = await $authHost.post("/users/cart", {
      id: id,
    });
    console.log(id);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as Error);
  }
});
