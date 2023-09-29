import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:'',
  status: "idle",
  error:[]
};

export const DeleteWebsiteSlice = createAsyncThunk(
    "DeleteWebsiteSlice",
    async (payload, thunkAPI) => {
      // console.log('edit  enter',payload)
      try {
        const response = await axios({
          method: "delete",
          url: `api/auth/delete_website/${payload.id}`,
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

export const Deletewebsiteslice = createSlice({
  name: "Deletewebsiteslice",
  initialState,

  reducers: {
    Delwebsitestateslice:(state) => {
      state.status = 'idle'
    },

  },
  extraReducers(builder) {
    builder
      .addCase(DeleteWebsiteSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteWebsiteSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(DeleteWebsiteSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
      });
  },
});

export const { Delwebsitestateslice } = Deletewebsiteslice.actions;

export const Deletewebsitestate = (state) => state.deletewebsite;

export default Deletewebsiteslice.reducer;