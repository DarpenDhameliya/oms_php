import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const FileDownloadSlice = createAsyncThunk(
    "FileDownloadSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: `api/auth/order_report`,
          data:payload,
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;
        if (data.status === true) {
          return data;
        }
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Filedownloadslice = createSlice({
  name: "Filedownloadslice",
  initialState,

  reducers: {
    Filedownloadstatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
      .addCase(FileDownloadSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FileDownloadSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(FileDownloadSlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = []
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Filedownloadstatus } = Filedownloadslice.actions;

export const Filedownloadstate = (state) => state.filedownload;

export default Filedownloadslice.reducer;