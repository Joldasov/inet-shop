import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../services/servise";

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
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
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
    addLogin: (state, action) => {
      state.login = action.payload;
    },
    addPassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: {
    [fetchLogin.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchLogin.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload
    },
    [fetchLogin.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLogin, addPassword } = Login.actions;

export default Login.reducer;
