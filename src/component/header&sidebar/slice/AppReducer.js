import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  status:true
};

export const formSlice = createSlice({
  name: "formslice",
  initialState,

  reducers: {
    openstatus:(state ,open) => {
      state.status = !state.status
    }
  },
})

export const { openstatus } = formSlice.actions

export const data = (state) => state.form
;

export default formSlice.reducer;