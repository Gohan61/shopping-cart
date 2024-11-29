import { createSlice } from "@reduxjs/toolkit";
import { pageState, SingleProductType } from "../../types/storeTypes";

const initialState = {
  currentPage: 1,
  itemsPerPage: 10,
  lastIndex: 0,
  firstIndex: 0,
  currentData: [],
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    currentPage: (
      state: pageState,
      action: {
        payload: { currentPage: number; products: SingleProductType[] };
      }
    ) => {
      const lastIndex = state.itemsPerPage * action.payload.currentPage;
      state.lastIndex = lastIndex;
      const firstIndex = (state.firstIndex = lastIndex - state.itemsPerPage);
      state.firstIndex = firstIndex;
      state.currentData = action.payload.products.slice(firstIndex, lastIndex);
    },
  },
});

export default pageSlice.reducer;
export const { currentPage } = pageSlice.actions;
