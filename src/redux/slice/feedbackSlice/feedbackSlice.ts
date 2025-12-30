
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchFeedbacksApi,
  addFeedbackApi,
} from "../../api/feedbackapi/feedbackApi";

// ✅ Thunks
export const fetchFeedbacks = createAsyncThunk("feedbacks/fetch", async () => {
  return await fetchFeedbacksApi();
});

export const addFeedback = createAsyncThunk("feedbacks/add", async (payload) => {
  return await addFeedbackApi(payload);
});

// ✅ Slice
const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks.push(action.payload);
      })
      .addCase(addFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default feedbackSlice.reducer;
