import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../commonLink/Axios";
const initialState = {
  response: [],
  status: "idle",
  error: [],
};

export const PickUpSlice = createAsyncThunk(
  "PickUpSlice",
  async (payload, thunkAPI) => {
    // console.log("add enter", payload);
    try {
      const response = await axios({
        method: "post",
        url: "api/auth/Pending_order",
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

export const Pickupslice = createSlice({
  name: "Pickupslice",
  initialState,

  reducers: {
    pickupchangestatus: (state) => {
      state.status = "idle";
    }
  },
  extraReducers(builder) {
    builder
      .addCase(PickUpSlice.pending, (state) => {
        state.status = "loading";
        state.error = [];
        state.response = [];
      })
      .addCase(PickUpSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        // // console.log(action.payload.data)
        state.response = action.payload;
        state.error = [];
      })
      .addCase(PickUpSlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = [];
        state.error = action.payload.response.data;
      });
  },
});

export const { pickupchangestatus } = Pickupslice.actions;
export const Pickupstate = (state) => state.pickup;

export default Pickupslice.reducer;
