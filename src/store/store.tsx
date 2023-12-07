import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./slice/AddCart";


import SearchReducer from "./slice/Search";
export const store = configureStore({
  reducer: {
    search: SearchReducer,
    cart: CartReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
