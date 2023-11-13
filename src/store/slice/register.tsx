import { createSlice } from "@reduxjs/toolkit";
import { fetchRegister } from "../thunk/RegisterThunk";
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
    addRegisterLogin: (state, action: { payload: string; type: string }) => {
      state.login = action.payload;
    },
    addRegisterPassword: (state, action: { payload: string; type: string }) => {
      state.password = action.payload;
    },
    addRegisterName: (state, action: { payload: string; type: string }) => {
      state.name = action.payload;
    },
    addRegisterSurname: (state, action: { payload: string; type: string }) => {
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

export const {
  addRegisterLogin,
  addRegisterPassword,
  addRegisterName,
  addRegisterSurname,
} = Register.actions;

export default Register.reducer;
