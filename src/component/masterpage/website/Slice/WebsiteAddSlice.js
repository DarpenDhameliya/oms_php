import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:'',
  status: "idle",
  error:[]
};

export const AddWebsiteSlice = createAsyncThunk(
    "AddWebsiteSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/add_website',
          data:payload,
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;  
        // console.log(data)
          return data;
      } catch (e) {
        // console.log("Error", e.response.data);
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Addwebsiteslice = createSlice({
  name: "Addwebsiteslice",
  initialState,

  reducers: {
    Addwebsitestateslice:(state) => {
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(AddWebsiteSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddWebsiteSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(AddWebsiteSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
      });
  },
});

export const { Addwebsitestateslice } = Addwebsiteslice.actions;

export const Addwebsitestate = (state) => state.addwebsite;

export default Addwebsiteslice.reducer;