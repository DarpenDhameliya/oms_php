import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../commonLink/Axios";
const initialState = {
  response: [],
  status: "idle",
  error: [],
};

export const PaymentReportFulldataSlice = createAsyncThunk(
  "PaymentReportFulldataSlice",
  async (payload, thunkAPI) => {
    // console.log("add enter", payload);
    try {
      const response = await axios({
        method: "post",
        url: "api/auth/paymentdata",
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

export const Paymentreportfulldataslice = createSlice({
  name: "Paymentreportfulldataslice",
  initialState,

  reducers: {
    Paymentreportfulldatastatus: (state) => {
      state.status = "idle";
    }
  },
  extraReducers(builder) {
    builder
      .addCase(PaymentReportFulldataSlice.pending, (state) => {
        state.status = "loading";
        state.error = [];
        state.response = [];
      })
      .addCase(PaymentReportFulldataSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        // // console.log(action.payload.data)
        state.response = action.payload;
        state.error = [];
      })
      .addCase(PaymentReportFulldataSlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = [];
        state.error = action.payload.response.data;
      });
  },
});

export const { Paymentreportfulldatastatus } = Paymentreportfulldataslice.actions;
export const Paymentreportfulldatastate = (state) => state.paymentreportfulldata;

export default Paymentreportfulldataslice.reducer;
