import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiProductType, ProductState } from "../../types/storeTypes";

const initialState: ProductState = {
  loading: false,
  products: [],
  error: "",
};

export const fetchSortedProducts = createAsyncThunk<
  ApiProductType,
  { category: string }
>("product/fetchSortedProducts", (arg: { category: string }) => {
  if (arg.category === "All") {
    return fetch("https://fakestoreapi.com/products?sort=desc", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }).then((res) => res.json());
  } else if (arg.category === "electronics") {
    return fetch(
      "https://fakestoreapi.com/products/category/electronics?sort=desc",
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    ).then((res) => res.json());
  } else if (arg.category === "jewelery") {
    return fetch(
      "https://fakestoreapi.com/products/category/jewelery?sort=desc",
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    ).then((res) => res.json());
  } else if (arg.category === "mens's clothing") {
    return fetch(
      "https://fakestoreapi.com/products/category/men's clothing?sort=desc",
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    ).then((res) => res.json());
  } else {
    return fetch(
      "https://fakestoreapi.com/products/category/women's clothing?sort=desc",
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    ).then((res) => res.json());
  }
});

export const fetchSingleCategory = createAsyncThunk<
  ApiProductType,
  { category: string }
>("category/fetchSingleCategory", (arg: { category: string }) => {
  if (arg.category === "All") {
    return fetch("https://fakestoreapi.com/products", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }).then((res) => res.json());
  } else {
    return fetch(`https://fakestoreapi.com/products/category/${arg.category}`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }).then((res) => res.json());
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSortedProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSortedProducts.fulfilled, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (state.loading = false), (state.products = action.payload);
    });
    builder.addCase(fetchSortedProducts.rejected, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (state.loading = false), (state.error = action.error.message as string);
    });
    builder.addCase(fetchSingleCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleCategory.fulfilled, (state, action) => {
      //   const currentState = store.getState().product;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (state.loading = false), (state.products = action.payload);
    });
    builder.addCase(fetchSingleCategory.rejected, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (state.loading = false), (state.error = action.error.message as string);
    });
  },
});

export default productSlice.reducer;
