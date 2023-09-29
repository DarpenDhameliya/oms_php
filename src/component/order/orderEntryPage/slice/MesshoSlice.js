import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:'',
  status: "idle",
  error:[]
};

export const MesshoSlice = createAsyncThunk(
    "MesshoSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/meeshoread',
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

export const Messhoslice = createSlice({
  name: "Messhoslice",
  initialState,

  reducers: {
    Messhostatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
    .addCase(MesshoSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(MesshoSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(MesshoSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Messhostatus } = Messhoslice.actions;

export const Messhostate = (state) => state.messho;

export default Messhoslice.reducer;