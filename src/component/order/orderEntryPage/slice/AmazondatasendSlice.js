import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const AmazonsenddataSlice = createAsyncThunk(
    "AmazonsenddataSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/insert_amazoneexcel',
          data:payload,
          headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;  
        // console.log('fetch time',data)
        if (data.status === true) {
          return data;
        } 
      } catch (e) {
        // console.log('errs',e)
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Amazonsenddataslice = createSlice({
  name: "Amazonsenddataslice",
  initialState,

  reducers: {
    amazonsenddatastatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
    .addCase(AmazonsenddataSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(AmazonsenddataSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(AmazonsenddataSlice.rejected, (state, action) => {
        state.status = "failed";
        // // console.log(action)
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { amazonsenddatastatus } = Amazonsenddataslice.actions;

export const Amazonsenddatastate = (state) => state.amazonsenddata;

export default Amazonsenddataslice.reducer;