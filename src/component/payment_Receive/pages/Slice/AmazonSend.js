import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const AmazonPaymentSendSlice = createAsyncThunk(
    "AmazonPaymentSendSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/insert_amazoneexcel',
          data:payload,
          headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;
        if (data.status === true) {
          return data;
        } 
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Amazonpaymentsendslice = createSlice({
  name: "Amazonpaymentsendslice",
  initialState,

  reducers: {
    amazonsenddatastatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
    .addCase(AmazonPaymentSendSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(AmazonPaymentSendSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(AmazonPaymentSendSlice.rejected, (state, action) => {
        state.status = "failed";
        // // console.log(action)
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Amazonpaymentsendstatus } = Amazonpaymentsendslice.actions;

export const Amazonpaymentsendstate = (state) => state.amazonpaymentsend;

export default Amazonpaymentsendslice.reducer;