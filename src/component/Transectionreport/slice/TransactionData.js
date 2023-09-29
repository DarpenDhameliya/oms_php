import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  response:[],
};


export const Transactiondataslice = createSlice({
  name: "Orderlistdataslice",
  initialState,

  reducers: {
    Transactiondatastatus:(state ,payload) => {
      state.response = payload
    },
    
  },
  });
  
export const { Transactiondatastatus } = Transactiondataslice.actions;

export const Transactiondatastatue = (state) => state.transactiondata;

export default Transactiondataslice.reducer;