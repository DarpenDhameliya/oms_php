import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../commonLink/Axios";
const initialState = {
  response: [],
  status: "idle",
  error: [],
};

export const PickupCheckSlice = createAsyncThunk(
  "PickupCheckSlice",
  async (payload, thunkAPI) => {
    // console.log("add enter", payload);
    try {
      const response = await axios({
        method: "post",
        url: "api/auth/pickup_entry",
        data: payload,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`,
        },
      });
      let data = await response.data;

        return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const Pickupsheckslice = createSlice({
  name: "Pickupsheckslice",
  initialState,

  reducers: {
    pickuupcheckedchangestate: (state) => {
      state.status = 'idle'
    }
  },
  extraReducers(builder) {
    builder
      .addCase(PickupCheckSlice.pending, (state) => {
        state.status = "loading";
        state.error = [];
        state.response = [];
      })
      .addCase(PickupCheckSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action)
        state.response = action.payload
        state.error = [];
      })
      .addCase(PickupCheckSlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = [];
        state.error = action.payload.response.data;
      });
  },
});

export const {pickuupcheckedchangestate} = Pickupsheckslice.actions

export const Pickupsheckstate = (state) => state.pickupcheck;

export default Pickupsheckslice.reducer;
