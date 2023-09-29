import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../commonLink/Axios";
const initialState = {
  response: [],
  status: "idle",
  error: [],
};

export const PaymentReceiveSlice = createAsyncThunk(
  "PaymentReceiveSlice",
  async (payload, thunkAPI) => {
    try {
      const response = await axios({
        method: "post",
        url: "api/auth/amount_receive_data",
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

export const Paymentreceiveslice = createSlice({
  name: "Paymentreceiveslice",
  initialState,

  reducers: {
    Paymentreceivechangestatus: (state) => {
      state.status = "idle";
    }
  },
  extraReducers(builder) {
    builder
      .addCase(PaymentReceiveSlice.pending, (state) => {
        state.status = "loading";
        state.error = [];
        state.response = [];
      })
      .addCase(PaymentReceiveSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action)
        state.response = action.payload;
        state.error = [];
      })
      .addCase(PaymentReceiveSlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = [];
        state.error = action.payload.response.data;
      });
  },
});

export const { Paymentreceivechangestatus } = Paymentreceiveslice.actions;
export const Paymentreceivestate = (state) => state.paymentreceive;

export default Paymentreceiveslice.reducer;

