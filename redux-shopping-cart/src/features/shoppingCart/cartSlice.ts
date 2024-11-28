import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  cartStateApi,
  SingleProductType,
  cartProduct,
} from "../../types/storeTypes";

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const initialState: cartStateApi = {};

export const fetchProduct = createAsyncThunk<SingleProductType, { id: number }>(
  "product/fetchProduct",
  (arg: { id: number }) => {
    return fetch(`https://fakestoreapi.com/products/${arg.id}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }).then((res) => res.json());
  }
);

const amountSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {
    addAmount: (
      state,
      action: { payload: { id: number; inputAmount: number } }
    ) => {
      if (!state[action.payload.id]) {
        state[action.payload.id] = { amount: 0 };
      }
      state[action.payload.id].amount += action.payload.inputAmount;
    },
    reduceAmount: (state, action) => {
      state[action.payload.id].amount--;

      if (state[action.payload.id].amount === 0) {
        delete state[action.payload.id];
      }
    },
    removeFromCart: (state, action) => {
      delete state[action.payload.id];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      const id = action.payload.id;
      state[id].totalPrice = formatter.format(
        action.payload.price * state[id].amount
      );

      state[id].title = action.payload.title;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
  },
});

export const selectTotalCheckout = (state: cartStateApi) => {
  let checkoutTotal: number = 0;
  Object.keys(state).map((item: string) => {
    if (item !== "totalCheckout") {
      checkoutTotal += Number((state[Number(item)] as cartProduct).totalPrice);
    }
  });
  return formatter.format(checkoutTotal);
};

export default amountSlice.reducer;
export const { addAmount, reduceAmount, removeFromCart } = amountSlice.actions;
