import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../commonLink/Axios";
const initialState = {
  response: [],
  status: "idle",
  error: [],
};

export const TransactionSlice = createAsyncThunk(
  "TransactionSlice",
  async (payload, thunkAPI) => {
    // // console.log("add enter", payload);
    try {
      const response = await axios({
        method: "post",
        url: "api/auth/transaction_report",
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

export const Transactionslice = createSlice({
  name: "Transactionslice",
  initialState,

  reducers: {
    Transactionstatus: (state) => {
      state.status = "idle";
    }
  },
  extraReducers(builder) {
    builder
      .addCase(TransactionSlice.pending, (state) => {
        state.status = "loading";
        state.error = [];
        state.response = [];
      })
      .addCase(TransactionSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
        state.error = [];
      })
      .addCase(TransactionSlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = [];
        state.error = action.payload.response.data;
      });
  },
});

export const { Transactionstatus } = Transactionslice.actions;
export const Transactionstate = (state) => state.transaction;

export default Transactionslice.reducer;
