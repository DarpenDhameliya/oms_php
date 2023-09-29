import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
// const token = JSON.parse(sessionStorage.getItem("userdata")); 
const initialState = {
  response:'',
  status: "idle",
  error:[]
};

export const EditBankSlice = createAsyncThunk(
    "EditBankSlice",
    async (payload, thunkAPI) => {
      // console.log('edit  enter',payload)
      // console.log(payload.id)
      try {
        const response = await axios({
          method: "post",
          url: `api/auth/edit_bankdetail/${payload.id}`,
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

export const Editbankslice = createSlice({
  name: "Editbankslice",
  initialState,

  reducers: {
    Editbankstateslice:(state) => {
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(EditBankSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(EditBankSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(EditBankSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
      });
  },
});

export const { Editbankstateslice } = Editbankslice.actions;


export const Editbankstate = (state) => state.editbank;

export default Editbankslice.reducer;