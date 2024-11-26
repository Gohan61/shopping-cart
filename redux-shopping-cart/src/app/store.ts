import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
