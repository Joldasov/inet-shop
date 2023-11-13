import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "../thunk/LoginThunk";

export interface loginState {
  login: string;
  password: string;
  error: [];
  isLoading: boolean;
  status: [];
}

const initialState: loginState = {
  login: "",
  password: "",
  error: [],
  isLoading: false,
  status: [],
};

export const Login = createSlice({
  name: "login",
  initialState,
  reducers: {
    addLogin: (state, action: { payload: string; type: string }) => {
      state.login = action.payload;
    },
    addPassword: (state, action: { payload: string; type: string }) => {
      state.password = action.payload;
    },
  },
  extraReducers: {
    [fetchLogin.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchLogin.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload;
    },
    [fetchLogin.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { addLogin, addPassword } = Login.actions;

export default Login.reducer;
