import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $authHost } from "../../services/servise";

export const fetchCart = createAsyncThunk("Auth/Cart", async (id, thunkAPI) => {
  try {
    const data = await $authHost.post("/users/cart", {
      id: id,
    });
    console.log(id);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as Error);
  }
});
export const fetchCartDelete = createAsyncThunk(
  "Auth/delete",
  async (id, thunkAPI) => {
    try {
      const data = await $authHost.post(`/users/cart?id=${id}`, {
        id: id,
      });
      console.log(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
export const fetchInFavor = createAsyncThunk(
  "Add/Favorities",
  async (id, thunkAPI) => {
    try {
      const data = await $authHost.post("/users/favorites", {
        id: id,
      });
      console.log(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);

interface cartState {
  isLoading: boolean;
  error: string;
  status: [];
  data: [];
  items: []

}
const initialState: cartState = {
  isLoading: false,
  error: "",
  status: [],
  data: [],
  items: []
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
    Items:(state, action) =>{
      state.items = action.payload.map((item) =>{
        return {
          id: item.id,
          amount: 1
        }
      })
    }
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

// Action creators are generated for each case reducer function
export const { DataAdd, Increament , Discreament, Items} = Cart.actions;

export default Cart.reducer;

// const filtered = state.prices.filter(
//   (item) => item?.id === String(action.payload)
// );
// console.log(filtered.length);
// if (filtered?.length > 0) {
//   state.prices = state.prices?.map((smt) => {
//     if (smt?.id === action?.payload) {
//       return {
//         id: smt?.id,
//         amount: (smt.amount += 1),
//       };
//     }
//   });
// } else {
//   state.prices = [
//     ...state.prices,
//     {
//       id: action.payload,
//       amount: 2,
//     },
//   ];
// }
