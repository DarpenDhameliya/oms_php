import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  response: [],
};

export const OrderReturnUncheck = createSlice({
  name: "OrderReturnUncheck",
  initialState,

  reducers: {
    Orderreturnuncheckstatus: (state , payload) => {
      state.response = payload;
    }
  },
});

export const { Orderreturnuncheckstatus } = OrderReturnUncheck.actions;

export const Orderreturnuncheckstate = (state) => state.orderreturnuncheck;

export default OrderReturnUncheck.reducer;
