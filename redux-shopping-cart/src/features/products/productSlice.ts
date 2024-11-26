import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiProductType, ProductState } from "../../types/storeTypes";

const initialState: ProductState = {
  loading: false,
  products: [],
  error: "",
};

export const fetchAllProducts = createAsyncThunk<
  ApiProductType,
  void,
  { rejectValue: string }
>("product/fetchAllProducts", () => {
  return fetch("https://fakestoreapi.com/products", {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  }).then((res) => res.json());
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (state.loading = false), (state.products = action.payload);
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (state.loading = false), (state.error = action.error.message as string);
    });
  },
});

export default productSlice.reducer;
