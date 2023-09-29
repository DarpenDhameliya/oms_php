import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const TransactionPaginationSlice = createAsyncThunk(
    "TransactionPaginationSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: `api/auth/transaction_report?page=${payload.page}`,
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

export const Transactionpaginationslice = createSlice({
  name: "Transactionpaginationslice",
  initialState,

  reducers: {
    Transactionpaginationstatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
      .addCase(TransactionPaginationSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(TransactionPaginationSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action)
        state.response = action.payload
        state.error = []
      })
      .addCase(TransactionPaginationSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
        state.response = []
      });
    },
  });
  
export const { Transactionpaginationstatus } = Transactionpaginationslice.actions;

export const Transactionpaginationstate = (state) => state.transactionpagination;

export default Transactionpaginationslice.reducer;