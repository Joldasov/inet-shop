import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../services/service";
import { endpoints } from "../../utils/const/endpoints";
import { thunkNames } from "../../utils/const/thunkNames";

interface ILogin {
  login: string;
  password: string;
}
export const fetchLogin = createAsyncThunk(
  thunkNames.AUTH_LOGIN,
  async ({ login, password }: ILogin, thunkAPI) => {
    try {
      const data = await $api.post(endpoints.AUTH_LOGIN, {
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
