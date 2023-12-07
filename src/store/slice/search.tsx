import { createSlice } from "@reduxjs/toolkit";


export interface searchState {
  error: string;
  isLoading: boolean;
  status: [];
  text: string;
  recent: [];
  visibility: boolean;
}

const initialState: searchState = {
  error: "",
  isLoading: false,
  status: [],
  text: "",
  recent: [],
  visibility: false,
};

export const Search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearch: (state, action: { payload: string; type: string }) => {
      state.text = action.payload;
    },
    addRecent: (state, action) => {
      state.recent.push(action.payload);
    },
    reset: (state) => {
      state.recent = [];
    },
    textClear: (state) => {
      state.text = "";
    },
    changeDisplayFalse: (state) => {
      state.visibility = false;
    },
    changeDisplayTrue: (state) => {
      state.visibility = true;
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
