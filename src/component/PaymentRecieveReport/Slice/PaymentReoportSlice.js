import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../commonLink/Axios";
const initialState = {
  response: [],
  status: "idle",
  error: [],
};

export const PaymentReceiveReportSlice = createAsyncThunk(
  "PaymentReceiveReportSlice",
  async (payload, thunkAPI) => {
    // console.log("add enter", payload);
    try {
      const response = await axios({
        method: "post",
        url: "api/auth/payment_receive_report",
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

export const Paymentreceivereportslice = createSlice({
  name: "Paymentreceivereportslice",
  initialState,

  reducers: {
    Paymentreceivechangestatus: (state) => {
      state.status = "idle";
    }
  },
  extraReducers(builder) {
    builder
      .addCase(PaymentReceiveReportSlice.pending, (state) => {
        state.status = "loading";
        state.error = [];
        state.response = [];
      })
      .addCase(PaymentReceiveReportSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
        state.error = [];
      })
      .addCase(PaymentReceiveReportSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
        state.response = [];
      });
  },
});

export const { Paymentreceivechangestatus } = Paymentreceivereportslice.actions;
export const Paymentreceivereportstate = (state) => state.paymentreport;

export default Paymentreceivereportslice.reducer;
