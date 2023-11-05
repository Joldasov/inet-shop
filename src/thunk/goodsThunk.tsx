import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../services/service";
interface IGoodsElec {
  elec: string;
  sort: string;
}

export const fetchGoodsElectronics = createAsyncThunk(
  "Auth/GoodsElectronics",
  async ({ elec, sort }: IGoodsElec, thunkAPI) => {
    try {
      const data = await $authHost.get(
        `/goods/category/${elec}?reverse=boolean&start=0&count=5&sortBy=${sort}`,
        {}
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
interface IGoodsHob {
  hobby: string;
  sort: string;
}
export const fetchGoodsHobbies = createAsyncThunk(
  "Auth/GoodsHobbies",
  async ({ hobby, sort }: IGoodsHob, thunkAPI) => {
    try {
      const data = await $authHost.get(
        `/goods/category/${hobby}?reverse=boolean&start=0&count=5&sortBy=${sort}`,
        {}
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);

interface IGoodsCom {
  comp: string;
  sort: string;
}
export const fetchGoodsComputers_peripherals = createAsyncThunk(
  "Auth/GoodsHobbies",
  async ({ comp, sort }: IGoodsCom, thunkAPI) => {
    try {
      const data = await $authHost.get(
        `/goods/category/${comp}?reverse=boolean&start=0&count=5&sortBy=${sort}`,
        {}
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
interface IApp {
  app: string;
  sort: string;
}
export const fetchApplience = createAsyncThunk(
  "Auth/applience",
  async ({ app, sort }: IApp, thunkAPI) => {
    try {
      const data = await $authHost.get(
        `/goods/category/${app}?reverse=boolean&start=0&count=5&sortBy=${sort}`,
        {}
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
interface IGoodsFur {
  fur: string;
  sort: string;
}
export const fetchGoodsFurniture = createAsyncThunk(
  "Auth/GoodsHobbies",
  async ({ fur, sort }: IGoodsFur, thunkAPI) => {
    try {
      const data = await $authHost.get(
        `/goods/category/${fur}?reverse=boolean&start=0&count=5&sortBy=${sort}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
