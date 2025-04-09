import { createSlice } from "@reduxjs/toolkit";
import { CollapseState } from "../../types/storeTypes";

const initialState: CollapseState = {};

const textSlice = createSlice({
  name: "description",
  initialState,
  reducers: {
    expandCollapse: (
      state,
      action: {
        payload: { id: string; collapse: boolean };
      }
    ) => {
      state[action.payload.id] = action.payload.collapse;
    },
  },
});

export default textSlice.reducer;
export const { expandCollapse } = textSlice.actions;
