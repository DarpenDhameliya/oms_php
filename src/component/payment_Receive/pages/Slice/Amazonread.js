import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const AmazonPaymentReadSlice = createAsyncThunk(
    "AmazonPaymentReadSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/amazoneread',
          data:payload,
          headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;  
        // console.log(data)
        if (data.status === true) {
          return data;
        } 
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Amazonpaymentreadslice = createSlice({
  name: "Amazonpaymentreadslice",
  initialState,

  reducers: {
    Amazonpaymentreadstatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
    .addCase(AmazonPaymentReadSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(AmazonPaymentReadSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(AmazonPaymentReadSlice.rejected, (state, action) => {
        state.status = "failed";
        // // console.log(action)
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Amazonpaymentreadstatus } = Amazonpaymentreadslice.actions;

export const Amazonpaymentreadstate = (state) => state.amazonpaymentread;

export default Amazonpaymentreadslice.reducer;