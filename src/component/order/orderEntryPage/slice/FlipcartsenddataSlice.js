import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const FlipcartsenddataSlice = createAsyncThunk(
    "FlipcartsenddataSlice",
    async (payload, thunkAPI) => {
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/insert_flipcartexcel',
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

export const Flipcartsenddataslice = createSlice({
  name: "Flipcartsenddataslice",
  initialState,

  reducers: {
    Flipcartsenddatastatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
    .addCase(FlipcartsenddataSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(FlipcartsenddataSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(FlipcartsenddataSlice.rejected, (state, action) => {
        state.status = "failed";
        // // console.log(action)
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Flipcartsenddatastatus } = Flipcartsenddataslice.actions;

export const Flipcartsenddatastate = (state) => state.flipcartsenddata;

export default Flipcartsenddataslice.reducer;