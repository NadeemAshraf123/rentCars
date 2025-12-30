import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBookingsApi, addBookingApi, updateBookingStatusApi } from "../../api/bookingapi/bookingApi";

export const fetchBookings = createAsyncThunk("bookings/fetch", async () => {
  return await fetchBookingsApi();
});

export const addBooking = createAsyncThunk("bookings/add", async (payload) => {
  return await addBookingApi(payload);
});

export const updateBookingStatus = createAsyncThunk("bookings/updateStatus", async ({ id, status }) => {
  return await updateBookingStatusApi(id, status);
});

const bookingSlice = createSlice({
  name: "bookings",
  initialState: { bookings: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => { state.loading = true; })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const idx = state.bookings.findIndex((b) => b.id === action.payload.id);
        if (idx !== -1) state.bookings[idx] = action.payload;
      });
  },
});

export default bookingSlice.reducer;
