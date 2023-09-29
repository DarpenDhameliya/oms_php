import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:'',
  status: "idle",
  error:[]
};

export const DeleteCourierSlice = createAsyncThunk(
    "DeleteCourierSlice",
    async (payload, thunkAPI) => {
      // console.log('edit  enter',payload)
      try {
        const response = await axios({
          method: "delete",
          url: `api/auth/delete_courier/${payload.id}`,
          data:payload,
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;  

          return data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Deletecoirierslice = createSlice({
  name: "Deletecoirierslice",
  initialState,

  reducers: {
    Delcourierstateslice:(state) => {
      state.status = 'idle'
    },

  },
  extraReducers(builder) {
    builder
      .addCase(DeleteCourierSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteCourierSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(DeleteCourierSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
      });
  },
});

export const { Delcourierstateslice } = Deletecoirierslice.actions;


export const Deletecoirierstate = (state) => state.deletecoirier;

export default Deletecoirierslice.reducer;