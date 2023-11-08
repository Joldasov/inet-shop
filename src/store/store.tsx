import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./slice/addCart";
import BuyStore from "./slice/buy";
import CatalogReducer from "./slice/catalog";
import GetItem from "./slice/getGood";
import GetSubItemReducer from "./slice/getSubCategory";
import GoodsReducer from "./slice/goods";
import loginReducer from "./slice/login";
import registerReducer from "./slice/register";
import SearchReducer from "./slice/search";
import UserInfoReducer from "./slice/userInfo";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    userInfo: UserInfoReducer,
    search: SearchReducer,
    goods: GoodsReducer,
    cart: CartReducer,
    get: GetItem,
    catalog: CatalogReducer,
    subItem: GetSubItemReducer,
    buy: BuyStore,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
