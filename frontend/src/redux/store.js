import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import fabricReducer from "./fabricSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    fabric: fabricReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
