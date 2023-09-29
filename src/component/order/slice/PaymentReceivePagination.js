import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const PaymentReceivePaginationSlice = createAsyncThunk(
    "PaymentReceivePaginationSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: `api/auth/order_report?page=${payload.page}`,
          data:payload,
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;
          return data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Paymentreceivepaginationslice = createSlice({
  name: "Paymentreceivepaginationslice",
  initialState,

  reducers: {
    Paymentreceivepaginationstatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
      .addCase(PaymentReceivePaginationSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(PaymentReceivePaginationSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(PaymentReceivePaginationSlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = []
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Paymentreceivepaginationstatus } = Paymentreceivepaginationslice.actions;

export const Paymentreceivepaginationstate = (state) => state.paymentreceivepagination;

export default Paymentreceivepaginationslice.reducer;