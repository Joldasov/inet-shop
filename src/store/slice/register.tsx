import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../services/servise";
// import axios from "axios";

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
export interface registerState {
  login: string;
  password: string;
  name: string;
  surname: string;
  error: string;
  isLoading: boolean;
  true: string;
}

const initialState: registerState = {
  login: "",
  password: "",
  error: "",
  isLoading: false,
  true: "",
  name: "",
  surname: "",
};

export const Register = createSlice({
  name: "register",
  initialState,
  reducers: {
    addRegisterLogin: (state, action) => {
      state.login = action.payload;
    },
    addRegisterPassword: (state, action) => {
      state.password = action.payload;
    },
    addRegisterName: (state, action) => {
      state.name = action.payload;
    },
    addRegisterSurname: (state, action) => {
      state.surname = action.payload;
    },
  },
  extraReducers: {
    [fetchRegister.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchRegister.fulfilled.type]: (state, action) => {
      state.true = action.payload;

      state.error = "";
      state.isLoading = false;
    },
    [fetchRegister.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addRegisterLogin,
  addRegisterPassword,
  addRegisterName,
  addRegisterSurname,
} = Register.actions;

export default Register.reducer;
