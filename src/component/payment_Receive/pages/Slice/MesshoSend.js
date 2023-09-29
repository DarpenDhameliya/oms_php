import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const MesshoPaymentSendSlice = createAsyncThunk(
    "MesshoPaymentSendSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/insert_meeshopdf',
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

export const Messhopaymentsendslice = createSlice({
  name: "Messhopaymentsendslice",
  initialState,

  reducers: {
    Messhopaymentsendstatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
    .addCase(MesshoPaymentSendSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(MesshoPaymentSendSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(MesshoPaymentSendSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Messhopaymentsendstatus } = Messhopaymentsendslice.actions;

export const Messhopaymentsendstate = (state) => state.messhopaymentsend;

export default Messhopaymentsendslice.reducer;