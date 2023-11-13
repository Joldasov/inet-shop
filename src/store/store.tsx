import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./slice/AddCart";
import BuyStore from "./slice/Buy";
import CatalogReducer from "./slice/Catalog";
import GetItem from "./slice/GetGood";
import GetSubItemReducer from "./slice/GetSubCategory";
import GoodsReducer from "./slice/Goods";
import loginReducer from "./slice/Login";
import registerReducer from "./slice/Register";
import SearchReducer from "./slice/Search";
import UserInfoReducer from "./slice/UserInfo";
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
