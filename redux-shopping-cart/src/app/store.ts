import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/shoppingCart/cartSlice";
import pageReducer from "../features/paginator/pageSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    page: pageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
