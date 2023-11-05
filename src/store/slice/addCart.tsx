import { fetchCart } from "../../thunk/addCartThunk";
import { createSlice } from "@reduxjs/toolkit";
interface cartState {
  isLoading: boolean;
  error: string;
  status: [];
  data: [];
  items: [];
}
const initialState: cartState = {
  isLoading: false,
  error: "",
  status: [],
  data: [],
  items: [],
};

export const Cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    DataAdd: (state, action) => {
      state.data = action.payload.map((item) => {
        return {
          id: item.id,
          name: item.name,
          imageUrls: item.imageUrls,
          rating: item.rating,
          availableAmount: item.availableAmount,
          price: item.price,
          description: item.description,
          isInCart: item.isInCart,
          isFavorite: item.isFavorite,
          amount: 1,
        };
      });
    },
    Increament: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload) {
          return {
            id: item?.id,
            name: item?.name,
            imageUrls: item?.imageUrls,
            rating: item?.rating,
            availableAmount: item?.availableAmount,
            price: item?.price * 2,
            description: item?.description,
            isInCart: item?.isInCart,
            isFavorite: item?.isFavorite,
            amount: (item.amount += 1),
          };
        } else {
          return {
            id: item?.id,
            name: item?.name,
            imageUrls: item?.imageUrls,
            rating: item?.rating,
            availableAmount: item?.availableAmount,
            price: item?.price,
            description: item?.description,
            isInCart: item?.isInCart,
            isFavorite: item?.isFavorite,
            amount: item.amount,
          };
        }
      });
    },
    Discreament: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload) {
          return {
            id: item?.id,
            name: item?.name,
            imageUrls: item?.imageUrls,
            rating: item?.rating,
            availableAmount: item?.availableAmount,
            price: item?.price / 2,
            description: item?.description,
            isInCart: item?.isInCart,
            isFavorite: item?.isFavorite,
            amount: (item.amount -= 1),
          };
        } else {
          return {
            id: item?.id,
            name: item?.name,
            imageUrls: item?.imageUrls,
            rating: item?.rating,
            availableAmount: item?.availableAmount,
            price: item?.price,
            description: item?.description,
            isInCart: item?.isInCart,
            isFavorite: item?.isFavorite,
            amount: item.amount,
          };
        }
      });
    },
    Items: (state, action) => {
      state.items = action.payload.map((item) => {
        return {
          id: item.id,
          amount: 1,
        };
      });
    },
  },
  extraReducers: {
    [fetchCart.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchCart.fulfilled.type]: (state, action) => {
      state.error = "";
      state.isLoading = false;
      state.status = action.payload;
    },
    [fetchCart.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { DataAdd, Increament, Discreament, Items } = Cart.actions;

export default Cart.reducer;

