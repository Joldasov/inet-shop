import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../services/Service";
import { endpoints } from "../../utils/const/endpoints";
import { thunkNames } from "../../utils/const/thunkNames";

interface Iregister {
  registerLogin: string;
  registerPassword: string;
  name: string;
  surname: string;
}
export const fetchRegister = createAsyncThunk(
  thunkNames.AUTH_REGISTER,
  async (
    { registerLogin, registerPassword, name, surname }: Iregister,
    thunkAPI
  ) => {
    try {
      const data = await $api.post(endpoints.AUTH_REGISTER, {
        name: name,
        surname: surname,
        login: registerLogin,
        password: registerPassword,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
