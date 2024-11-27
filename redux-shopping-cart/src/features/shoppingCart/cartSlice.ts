import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartStateApi, SingleProductType } from "../../types/storeTypes";

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
      state[action.payload.id] = { amount: action.payload.inputAmount };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      const id = action.payload.id;
      state[id].totalPrice = action.payload.price * state[id].amount;
      state[id].title = action.payload.title;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
  },
});

export default amountSlice.reducer;
export const { addAmount } = amountSlice.actions;
