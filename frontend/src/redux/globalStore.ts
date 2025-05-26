import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
export const globalStore = configureStore({
  reducer: {
    menus: menuReducer,
    auths: authReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
