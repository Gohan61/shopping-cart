import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/shoppingCart/cartSlice";
import pageReducer from "../features/paginator/pageSlice";
import categoryReducer from "../features/categories/categorySlice";
import expandCollapse from "../features/textCollapse/textSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    page: pageReducer,
    category: categoryReducer,
    description: expandCollapse,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
