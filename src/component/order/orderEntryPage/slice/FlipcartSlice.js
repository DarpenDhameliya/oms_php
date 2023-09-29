import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const FlipcartSlice = createAsyncThunk(
    "FlipcartSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/flipcartread',
          data:payload,
          headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;  
        if (data.status === true) {
          return data;
        } 
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Flipcartslice = createSlice({
  name: "Flipcartslice",
  initialState,

  reducers: {
    flipcartstatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
    .addCase(FlipcartSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(FlipcartSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(FlipcartSlice.rejected, (state, action) => {
        state.status = "failed";
        // // console.log(action)
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { flipcartstatus } = Flipcartslice.actions;

export const Flipcartstate = (state) => state.flipcart;

export default Flipcartslice.reducer;