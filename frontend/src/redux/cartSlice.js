import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCartAPI,
  removeFromCartAPI,
  updateCartAPI,
  clearCartAPI,
  getCart,
} from "../services/api.js";

// Fetch cart items from database when app loads
// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, { getState, rejectWithValue }) => {
//     const userId = getState().auth?.user?.id; // Use optional chaining to avoid errors

//     if (!userId) {
//       return rejectWithValue("User ID is required"); // Reject the request gracefully
//     }

//     try {
//       const response = await getCart(userId);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message); // Return error properly
//     }
//   }
// );

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    const userId = getState().auth?.user?._id;
    if (!userId) {
      return rejectWithValue("User ID is required");
    }
    try {
      const response = await getCart(userId);
      console.log("API Response:", response); // Should show {items: Array(6)}
      return response; // Return the entire response object
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Add to cart in DB and then update Redux store
export const addToCartDB = createAsyncThunk(
  "cart/addToCartDB",
  async (product, { dispatch }) => {
    await addToCartAPI(product);
    dispatch(fetchCart()); // Re-fetch updated cart
  }
);

// Remove item from DB and then update Redux store
export const removeFromCartDB = createAsyncThunk(
  "cart/removeFromCartDB",
  async (productId, { dispatch, getState }) => {
    const userId = getState().auth?.user?._id;
    console.log(`userId (frontend): ${userId}`);
    await removeFromCartAPI(productId, userId);
    dispatch(fetchCart());
  }
);

// Update cart item quantity in DB and Redux
export const updateQuantityDB = createAsyncThunk(
  "cart/updateQuantityDB",
  async ({ fabricId, quantity }, { dispatch, getState }) => {
    const userId = getState().auth?.user?._id;

    if (!userId) {
      throw new Error("User ID is required"); // Or handle this more gracefully
    }
    console.log(`userId: (frontend) ${userId}`);
    console.log(`fabricId: (frontend) ${fabricId}`);
    console.log(`Quantity: (frontend) ${quantity}`);
    await updateCartAPI(userId, fabricId, quantity);
    dispatch(fetchCart());
  }
);

// Clear cart from DB and Redux
export const clearCartDB = createAsyncThunk(
  "cart/clearCartDB",
  async (_, { dispatch, getState }) => {
    const userId = getState().auth?.user?._id;
    await clearCartAPI(userId);
    dispatch(fetchCart());
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        // Access items from the payload
        state.cartItems = action.payload.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load cart";
      });
  },
});

export default cartSlice.reducer;
// export { addToCartDB, removeFromCartDB, updateQuantityDB, clearCartDB };
