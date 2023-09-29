import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  response: [],
};

export const Paymentuncheckslice = createSlice({
  name: "Paymentuncheckslice",
  initialState,

  reducers: {
    paymentuncheckstatus: (state , payload) => {
      state.response = payload;
    }
  },
});

export const { paymentuncheckstatus } = Paymentuncheckslice.actions;

export const Paymentuncheckstate = (state) => state.paymentuncheck;

export default Paymentuncheckslice.reducer;
