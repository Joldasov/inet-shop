import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../services/service";

interface Iregister {
  login: string;
  password: string;
}
export const fetchLogin = createAsyncThunk(
  "Auth/Login",
  async ({ login, password }: Iregister, thunkAPI) => {
    try {
      const data = await $api.post("/users/login", {
        login: login,
        password: password,
      });
      localStorage.setItem("token", data.data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);