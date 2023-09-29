import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const SpecificOdrSlice = createAsyncThunk(
    "SpecificOdrSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/order_report',
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

export const Spacificodrslice = createSlice({
  name: "Spacificodrslice",
  initialState,

  reducers: {
    specificodrstatus:(state) => {
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(SpecificOdrSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SpecificOdrSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(SpecificOdrSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
        state.response = []
      });
  },
});

export const { specificodrstatus } = Spacificodrslice.actions;

export const Spacificodrstate = (state) => state.spacificodr;

export default Spacificodrslice.reducer;