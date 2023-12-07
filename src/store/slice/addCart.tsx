import { createSlice } from "@reduxjs/toolkit";
interface cartState {
  isLoading: boolean;
  error: string;
  status: [];
  data: [
    {
      id: string;
      name: string;
      imageUrls: [string];
      rating: number;
      availableAmount: string;
      price: number;
      description: string;
      isInCart: boolean;
      isFavorite: boolean;
      amount: number;
    }
  ];
  items: [{ id: string; amount: number }];
}
const initialState: cartState = {
  isLoading: false,
  error: "",
  status: [],
  data: [
    {
      id: "",
      name: "",
      imageUrls: [""],
      rating: 0,
      availableAmount: "",
      price: 0,
      description: "",
      isInCart: false,
      isFavorite: false,
      amount: 1,
    },
  ],
  items: [
    {
      id: "",
      amount: 0,
    },
  ],
};

export const Cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    DataAdd: (state, action) => {
      state.data = action.payload.map(
        (item: {
          id: string;
          name: string;
          imageUrls: [string];
          rating: number;
          availableAmount: string;
          price: number;
          description: string;
          isInCart: boolean;
          isFavorite: boolean;
          amount: number;
        }) => {
          return {
            ...item,
            amount: 1,
          };
        }
      );
    },
    Increament: (state, action: { payload: string; type: string }) => {
      state.data = state.data.map(
        (item: {
          id: string;
          name: string;
          imageUrls: [string];
          rating: number;
          availableAmount: string;
          price: number;
          description: string;
          isInCart: boolean;
          isFavorite: boolean;
          amount: number;
        }) => {
          if (item.id === action.payload) {
            return {
              ...item,
              price: item?.price * 2,
              amount: (item.amount += 1),
            };
          } else {
            return item;
          }
        }
      );
    },
    Discreament: (state, action: { payload: string; type: string }) => {
      state.data = state.data.map(
        (item: {
          id: string;
          name: string;
          imageUrls: [string];
          rating: number;
          availableAmount: string;
          price: number;
          description: string;
          isInCart: boolean;
          isFavorite: boolean;
          amount: number;
        }) => {
          if (item.id === action.payload) {
            return {
              ...item,
              price: item?.price / 2,
              amount: (item.amount -= 1),
            };
          } else {
            return item;
          }
        }
      );
    },
    Items: (state, action) => {
      state.items = action.payload?.map(
        (item: { id: string; amount: number }) => {
          return {
            id: item.id,
            amount: item.amount,
          };
        }
      );
    },
  },
});

export const { DataAdd, Increament, Discreament, Items } = Cart.actions;

export default Cart.reducer;
