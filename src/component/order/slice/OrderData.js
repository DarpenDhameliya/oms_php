import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  response:[],
};


export const Orderlistdataslice = createSlice({
  name: "Orderlistdataslice",
  initialState,

  reducers: {
    odrListSelectedData:(state ,payload) => {
      // console.log(payload)
      state.response = payload
    },
    
  },
  });
  
export const { odrListSelectedData } = Orderlistdataslice.actions;

export const odrListdelecteddatastate = (state) => state.orderlistdata;

export default Orderlistdataslice.reducer;