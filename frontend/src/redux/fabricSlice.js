import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFabrics } from "../services/api";

// Async action to fetch fabrics from the backend
export const fetchFabrics = createAsyncThunk("fabric/fetchFabrics", async () => {
  const response = await getAllFabrics();
  return response.data;
});

const fabricSlice = createSlice({
  name: "fabric",
  initialState: {
    fabrics: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFabrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFabrics.fulfilled, (state, action) => {
        state.loading = false;
        state.fabrics = action.payload;
      })
      .addCase(fetchFabrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fabricSlice.reducer;
