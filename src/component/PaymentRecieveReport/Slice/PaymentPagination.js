import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const PaymentPaginationSlice = createAsyncThunk(
    "PaymentPaginationSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: `api/auth/paymentdata?page=${payload.page}`,
          data:payload,
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;
        // console.log(data)
          return data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Paymentpaginationslice = createSlice({
  name: "Paymentpaginationslice",
  initialState,

  reducers: {
    Paymentpaginationstatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
      .addCase(PaymentPaginationSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(PaymentPaginationSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(PaymentPaginationSlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = []
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Paymentpaginationstatus } = Paymentpaginationslice.actions;

export const Paymentpaginationstate = (state) => state.paymentpagination;

export default Paymentpaginationslice.reducer;