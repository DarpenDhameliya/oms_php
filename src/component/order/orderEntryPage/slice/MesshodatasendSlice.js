import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const MesshosenddataSlice = createAsyncThunk(
    "MesshosenddataSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/insert_meeshopdf',
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

export const Messhosenddataslice = createSlice({
  name: "Messhosenddataslice",
  initialState,

  reducers: {
    Messhosenddatastatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
    .addCase(MesshosenddataSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(MesshosenddataSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(MesshosenddataSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Messhosenddatastatus } = Messhosenddataslice.actions;

export const Messhosenddatastate = (state) => state.messhosenddata;

export default Messhosenddataslice.reducer;