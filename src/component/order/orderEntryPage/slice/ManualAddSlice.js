import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:'',
  status: "idle",
  error:[]
};

export const ManualAddSlice = createAsyncThunk(
    "ManualAddSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/orderEntry',
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

export const Manualaddslice = createSlice({
  name: "Manualaddslice",
  initialState,

  reducers: {
    manualodrstatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
    .addCase(ManualAddSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(ManualAddSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(ManualAddSlice.rejected, (state, action) => {
        state.status = "failed";
        // console.log(action)
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { manualodrstatus } = Manualaddslice.actions;

export const Manualaddstate = (state) => state.manualadd;

export default Manualaddslice.reducer;