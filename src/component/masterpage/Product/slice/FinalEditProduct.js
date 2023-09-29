import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'

const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const FinalEditProductSlice = createAsyncThunk(
    "FinalEditProductSlice",
    async (payload  , thunkAPI) => {
      // console.log('enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: `api/auth/edit_product/${payload.sku}`,
          data:payload,
          headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;  
          return data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Finaleditproductslice = createSlice({
  name: "Finaleditproductslice",
  initialState,

  reducers: {
    updateproducteditfinalstate:(state) => {
      state.status = 'idle'
    },

  },
  extraReducers(builder) {
    builder
      .addCase(FinalEditProductSlice.pending, (state) => {
        state.status = "loading";
        state.response = []
        state.error = []
      })
      .addCase(FinalEditProductSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload.message
        state.error = []
      })
      .addCase(FinalEditProductSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
        state.response = []
      })
  },
});

export const { updateproducteditfinalstate } = Finaleditproductslice.actions;

export const Finaleditproductstate = (state) => state.finaleditproduct;

export default Finaleditproductslice.reducer;