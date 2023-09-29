import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  status:false
};

export const SidebardataSlice = createSlice({
  name: "SidebardataSlice",
  initialState,

  reducers: {
    SidebartrueSlice:(state ) => {
      state.status = true
    },
    SidebarfalseSlice:(state) => {
      state.status = false
    }
  },
})

export const { SidebartrueSlice , SidebarfalseSlice } = SidebardataSlice.actions


export default SidebardataSlice.reducer;