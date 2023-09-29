import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const OrderReturnSendSlice = createAsyncThunk(
    "OrderReturnSendSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/insert_returndata',
          data:payload,
          headers:{
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

export const Orderreturnsendslice = createSlice({
  name: "Orderreturnsendslice",
  initialState,

  reducers: {
    Orderreturnsendstatus:(state) => {
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(OrderReturnSendSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(OrderReturnSendSlice.fulfilled, (state, action) => {
        // console.log(action)
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(OrderReturnSendSlice.rejected, (state, action) => {
        state.status = "failed";
        // console.log(action)
        state.response = []
        state.error = action.payload.response.data;
      });
  },
});

export const { Orderreturnsendstatus } = Orderreturnsendslice.actions;

export const Orderreturnsendstate = (state) => state.orderreturnsend;

export default Orderreturnsendslice.reducer;