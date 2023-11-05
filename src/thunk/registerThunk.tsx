import { createAsyncThunk} from "@reduxjs/toolkit";
import { $api } from "../services/service";

interface Iregister {
  registerLogin: string;
  registerPassword: string;
  name: string;
  surname: string;
}
export const fetchRegister = createAsyncThunk(
  "Auth/Register",
  async (
    { registerLogin, registerPassword, name, surname }: Iregister,
    thunkAPI
  ) => {
    try {
      const data = await $api.post("/users/register", {
        name: name,
        surname: surname,
        login: registerLogin,
        password: registerPassword,
      });
      console.log(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);