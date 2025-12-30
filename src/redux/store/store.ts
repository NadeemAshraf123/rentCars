import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authslice/authSlice";
import carReducer from "../slice/carslice/carSlice";
import bookingsReducer from "../slice/bookingslice/bookingSlice";
import feedbackReducer from "../slice/feedbackSlice/feedbackSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carReducer,
    bookings: bookingsReducer,
    feedbacks: feedbackReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
