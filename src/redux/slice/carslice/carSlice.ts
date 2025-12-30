import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCarsApi,
  addCarApi,
  updateCarApi,
  deleteCarApi,
} from "../../api/carApi/carApi";

// GET cars
export const fetchCars = createAsyncThunk("cars/fetchCars", async (_, thunkAPI) => {
  try {
    return await fetchCarsApi();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// ADD car
export const addCar = createAsyncThunk("cars/addCar", async (carData, thunkAPI) => {
  try {
    return await addCarApi(carData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// UPDATE car
export const updateCar = createAsyncThunk(
  "cars/updateCar",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateCarApi(id, data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// DELETE car
export const deleteCar = createAsyncThunk("cars/deleteCar", async (id, thunkAPI) => {
  try {
    return await deleteCarApi(id);
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
      // FETCH
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

      // ADD
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
      })

      // UPDATE
      .addCase(updateCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex((car) => car.id === action.payload.id);
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter((car) => car.id !== action.payload);
      });
  },
});

export default carSlice.reducer;
