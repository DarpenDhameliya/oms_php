import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const AmazonSlice = createAsyncThunk(
    "AmazonSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/amazoneread',
          data:payload,
          headers:{
            'Content-Type': 'multipart/form-data',
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

export const Amazonslice = createSlice({
  name: "Amazonslice",
  initialState,

  reducers: {
    amazonstatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
    .addCase(AmazonSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(AmazonSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(AmazonSlice.rejected, (state, action) => {
        state.status = "failed";
        // // console.log(action)
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { amazonstatus } = Amazonslice.actions;

export const Amazonstate = (state) => state.amazon;

export default Amazonslice.reducer;