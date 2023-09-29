import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:'',
  status: "idle",
  error:[]
};

export const EditCourierSlice = createAsyncThunk(
    "EditCourierSlice",
    async (payload, thunkAPI) => {
      // console.log('edit  enter',payload)
      // console.log(payload.id)
      try {
        const response = await axios({
          method: "post",
          url: `api/auth/edit_courier/${payload.id}`,
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

export const Editcoirierslice = createSlice({
  name: "Editcoirierslice",
  initialState,

  reducers: {
    Editcourierstateslice:(state) => {
      state.status = 'idle'
    },

  },
  extraReducers(builder) {
    builder
      .addCase(EditCourierSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(EditCourierSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(EditCourierSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.response.data;
      });
  },
});

export const { Editcourierstateslice } = Editcoirierslice.actions;

export const Editcoirierstate = (state) => state.editcoirier;

export default Editcoirierslice.reducer;