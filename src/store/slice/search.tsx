import { createSlice } from "@reduxjs/toolkit";
import { fetchSearch } from "../thunk/SearchThunk";

export interface searchState {
  error: string;
  isLoading: boolean;
  status: [];
  text: string;
  recent: [];
  smt: boolean;
}

const initialState: searchState = {
  error: "",
  isLoading: false,
  status: [],
  text: "",
  recent: [],
  smt: false,
};

export const Search = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearch: (state, action: { payload: string; type: string }) => {
      state.text = action.payload;
    },
    addRecent: (state, action: { payload: string; type: string }) => {
      state.recent.push(action.payload);
    },
    reset: (state) => {
      state.recent = [];
    },
    textClear: (state) => {
      state.text = "";
    },
    changeDisplayFalse: (state) => {
      state.smt = false;
    },
    changeDisplayTrue: (state) => {
      state.smt = true;
    },
  },
  extraReducers: {
    [fetchSearch.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchSearch.fulfilled.type]: (state, action) => {
      state.status = action.payload;
      state.error = "";
      state.isLoading = false;
    },
    [fetchSearch.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  addSearch,
  addRecent,
  reset,
  textClear,
  changeDisplayFalse,
  changeDisplayTrue,
} = Search.actions;

export default Search.reducer;
