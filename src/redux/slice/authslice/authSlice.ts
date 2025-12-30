import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, signupApi } from "../../api/authapi/authApi";

// 🔹 helper: localStorage se user load karna
const storedUser = localStorage.getItem("user");

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const user = await loginApi(email, password);

      // ✅ persist user + token
      localStorage.setItem("token", btoa(`${email}:${password}`));
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, thunkAPI) => {
    try {
      const user = await signupApi(userData);

      // 🔹 optional: auto-login after signup
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  // ✅ CHANGE #1: initialState localStorage se hydrate
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: !!storedUser,
    loading: false,
    error: null,
  },

  reducers: {
    // ✅ CHANGE #2: proper logout
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔹 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
