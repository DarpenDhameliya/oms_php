import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:'',
  status: "idle",
  error:[]
};

export const EditWebsiteSlice = createAsyncThunk(
    "EditWebsiteSlice",
    async (payload, thunkAPI) => {
      // console.log('edit  enter',payload)
      // // console.log(payload.id)
      try {
        const response = await axios({
          method: "post",
          url: `api/auth/edit_website/${payload.id}`,
          data:payload,
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;  
        // // console.log(data)
          return data;
        
      } catch (e) {
        // // console.log("Error", e.response.data);
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Editwebsiteslice = createSlice({
  name: "Editwebsiteslice",
  initialState,

  reducers: {
    Editwebsitestateslice:(state) => {
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(EditWebsiteSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(EditWebsiteSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(EditWebsiteSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
      });
  },
});

export const { Editwebsitestateslice } = Editwebsiteslice.actions;

export const Editwebsitestate = (state) => state.editwebsite;

export default Editwebsiteslice.reducer;