import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  response: Boolean ,
  status: 'idel',
};

export const NetErrslice = createSlice({
  name: "NetErrslice",
  initialState,

  reducers: {
    NetErrstatus: (state , netstates) => {
      state.status = 'success';
      state.response = netstates.payload;
    },
    NetErrChangestatus: (state) => {
      state.status = 'idel';
    }
  },
});

export const { NetErrstatus ,NetErrChangestatus } = NetErrslice.actions;

export const NetErrstates = (state) => state.neterr;

export default NetErrslice.reducer;
