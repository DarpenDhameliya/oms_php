import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const FlipcartPaymentSendSlice = createAsyncThunk(
    "FlipcartPaymentSendSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/insert_flipcartexcel',
          data:payload,
          headers:{
            'Content-Type': 'multipart/form-data',
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

export const Flipcartpaymentsendslice = createSlice({
  name: "Flipcartpaymentsendslice",
  initialState,

  reducers: {
    Flipcartpaymentsendstatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
    .addCase(FlipcartPaymentSendSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(FlipcartPaymentSendSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(FlipcartPaymentSendSlice.rejected, (state, action) => {
        state.status = "failed";
        // // console.log(action)
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Flipcartpaymentsendstatus } = Flipcartpaymentsendslice.actions;

export const Flipcartpaymentsendstate = (state) => state.flipcartpaymentsend;

export default Flipcartpaymentsendslice.reducer;