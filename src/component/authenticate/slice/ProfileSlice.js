import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../commonLink/Axios'
const initialState = {
  response: "",
  status: "idle",
  error:[],
};


export const ProfileSlice = createAsyncThunk(
    "ProfileSlice",
    async (payload, thunkAPI) => {
      // console.log(payload)
      try {
        const response = await axios({
          method: "post",
          url: "api/auth/change_password",
          data:payload,
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;    
        return data; 
      } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );

export const Profileslice = createSlice({
  name: "Profileslice",
  initialState,

  reducers: {
    Profilestatus:(state) => {
      state.status = 'idle'
    },

  },
  extraReducers(builder) {
    builder
      .addCase(ProfileSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ProfileSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload.message;
        state.error = []
      })
      .addCase(ProfileSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.errors;
        state.response = ''
      });
  },
});

export const { Profilestatus } = Profileslice.actions;

export const Profilestate = (state) => state.profile;

export default Profileslice.reducer;
