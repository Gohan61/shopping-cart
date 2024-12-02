import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoriesType, categoryState } from "../../types/storeTypes";

const initialState: categoryState = {
  loading: false,
  categories: [],
  currentCategory: "",
  error: "",
};

export const fetchCategories = createAsyncThunk<categoriesType, void>(
  "category/fetchAllCategories",
  () => {
    return fetch("https://fakestoreapi.com/products/categories", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }).then((res) => res.json());
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.currentCategory = action.payload.category;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (state.loading = false), (state.categories = action.payload);
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (state.loading = false), (state.error = action.error.message as string);
    });
  },
});

export default categorySlice.reducer;
export const { setCategory } = categorySlice.actions;
