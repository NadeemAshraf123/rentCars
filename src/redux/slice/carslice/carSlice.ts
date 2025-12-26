import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCarsApi, addCarApi } from "../../store/carApi/carApi";

export const fetchCars = createAsyncThunk("cars/fetchCars", async (_, thunkAPI) => {
  try {
    return await fetchCarsApi();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const addCar = createAsyncThunk("cars/addCar", async (carData, thunkAPI) => {
  try {
    return await addCarApi(carData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const carSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
      });
  },
});

export default carSlice.reducer;
