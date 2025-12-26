import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authslice/authSlice";
import carReducer from "../slice/carslice/carSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carReducer,
  },
});

// 🔹 TYPES (recommended for TS projects)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
