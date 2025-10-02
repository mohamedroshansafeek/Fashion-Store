import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  error: null,
};

// Thunk to add a review with token
export const addReview = createAsyncThunk(
  "/review/addReview",
  async (formdata, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // get JWT token from storage
      const response = await axios.post(
        "https://fashion-store-9alj.onrender.com/api/shop/review/add",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Return error message
      return rejectWithValue(error.response.data.message || "Failed to add review");
    }
  }
);

// Thunk to get reviews (public, no token needed)
export const getReviews = createAsyncThunk(
  "/review/getReviews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fashion-store-9alj.onrender.com/api/shop/review/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to get reviews");
    }
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET REVIEWS
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
        state.error = action.payload;
      })

      // ADD REVIEW
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally, add the new review to the list
        state.reviews.push(action.payload.data);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
