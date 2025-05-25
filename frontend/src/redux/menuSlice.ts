import { createSlice } from "@reduxjs/toolkit";

interface MenuState {
  responsive: boolean;
}

const initialState: MenuState = {
  responsive: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openResponsive: (state, action) => {
      state.responsive = action.payload;
    },
  },
});

export default menuSlice.reducer;
export const { openResponsive } = menuSlice.actions;
