import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  response:[],
};


export const Paymentdataslice = createSlice({
  name: "Paymentdataslice",
  initialState,

  reducers: {
    Paginationdatastatus:(state ,payload) => {
      // console.log(payload)
      state.response = payload
    },
    
  },
  });
  
export const { Paginationdatastatus } = Paymentdataslice.actions;

export const Paginationdatastate = (state) => state.paginationdata;

export default Paymentdataslice.reducer;