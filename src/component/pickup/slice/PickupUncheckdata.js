import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  response: [],
};

export const Pickupunchangeslice = createSlice({
  name: "Pickupunchangeslice",
  initialState,

  reducers: {
    pickupunchangestatus: (state , payload) => {
      // console.log(payload)
      state.response = payload;
    }
  },
});

export const { pickupunchangestatus } = Pickupunchangeslice.actions;

export const Pickupuncheckstate = (state) => state.pickupuncheck;

export default Pickupunchangeslice.reducer;
