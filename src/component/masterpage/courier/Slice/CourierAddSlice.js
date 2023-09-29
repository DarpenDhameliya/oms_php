import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:'',
  status: "idle",
  error:[]
};

export const AddCourierSlice = createAsyncThunk(
    "AddCourierSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/add_courier',
          data:payload,
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;
          return data;

      } catch (e) {
        // // console.log("Error", e.response.data);
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Addcourierslice = createSlice({
  name: "Addcourierslice",
  initialState,

  reducers: {
    Addcourierstateslice:(state) => {
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(AddCourierSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddCourierSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(AddCourierSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
      });
  },
});

export const { Addcourierstateslice } = Addcourierslice.actions;

export const Addcourierstate = (state) => state.addcourier;

export default Addcourierslice.reducer;