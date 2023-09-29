import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
// const token = JSON.parse(sessionStorage.getItem("userdata")); 
const initialState = {
  response:'',
  status: "idle",
  error:[]
};

export const DeleteBankSlice = createAsyncThunk(
    "DeleteBankSlice",
    async (payload, thunkAPI) => {
      // console.log('edit  enter',payload)
      try {
        const response = await axios({
          method: "delete",
          url: `api/auth/delete_bankdetail/${payload.id}`,
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

export const Deletebankslice = createSlice({
  name: "Deletebankslice",
  initialState,

  reducers: {
    Delbankstateslice:(state) => {
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
    .addCase(DeleteBankSlice.pending, (state) => {
      state.status = "loading";
      })
      .addCase(DeleteBankSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(DeleteBankSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
      });
    },
  });
  export const { Delbankstateslice } = Deletebankslice.actions;

export const Deletebankstate = (state) => state.deletebank;

export default Deletebankslice.reducer;