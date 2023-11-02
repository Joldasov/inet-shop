import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slice/login'
import registerReducer from './slice/register'
import UserInfoReducer from './slice/userInfo'
import SearchReducer from './slice/search'
import GoodsReducer from './slice/goods'
import CartReducer from './slice/addCart'
import GetItem from './slice/get'
import CatalogReducer from './slice/Catalog'
import GetSubItemReducer from './slice/getSubCategory'
import BuyStore from './slice/Buy'
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
    buy: BuyStore
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch