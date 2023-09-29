import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
// const token = JSON.parse(sessionStorage.getItem("userdata")); 
const initialState = {
  response:'',
  status: "idle",
  error:[]
};

export const AddBankSlice = createAsyncThunk(
    "AddBankSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/add_bank_detail',
          data:payload,
          headers:{
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

export const Addbankslice = createSlice({
  name: "Addbankslice",
  initialState,

  reducers: {
    Addbankstateslice:(state) => {
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
    .addCase(AddBankSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(AddBankSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(AddBankSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
      });
    },
  });
  
  export const { Addbankstateslice } = Addbankslice.actions;
  
export const Addbankstate = (state) => state.addbank;

export default Addbankslice.reducer;