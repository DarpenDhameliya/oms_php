import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const FlipcartPaymentReadSlice = createAsyncThunk(
    "FlipcartPaymentReadSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/flipcartread',
          data:payload,
          headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;  
        console.log('api',data)
        if (data.status === true) {
          return data;
        } 
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Flipcartpaymentreadslice = createSlice({
  name: "Flipcartpaymentreadslice",
  initialState,

  reducers: {
    Flipcartpaymentreadstatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
    .addCase(FlipcartPaymentReadSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(FlipcartPaymentReadSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action)
        state.response = action.payload
        state.error = []
      })
      .addCase(FlipcartPaymentReadSlice.rejected, (state, action) => {
        state.status = "failed";
        // // console.log(action)
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Flipcartpaymentreadstatus } = Flipcartpaymentreadslice.actions;

export const Flipcartpaymentreadstate = (state) => state.flipcartpaymentread;

export default Flipcartpaymentreadslice.reducer;
