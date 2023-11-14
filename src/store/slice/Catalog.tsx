import { createSlice } from "@reduxjs/toolkit";
import { fetchCatalog } from "../thunk/CatalogThunk";
import { sliceNames } from "../../utils/const/SliceNames";
export interface getItemState {
  error: string;
  isLoading: boolean;
  status: [];
}

const initialState: getItemState = {
  error: "",
  isLoading: false,
  status: [],
};

export const Catalog = createSlice({
  name: sliceNames.USER_CATALOG,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCatalog.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchCatalog.fulfilled.type]: (state, action) => {
      state.status = action.payload;
      state.error = "";
      state.isLoading = false;
    },
    [fetchCatalog.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {} = Catalog.actions;

export default Catalog.reducer;
