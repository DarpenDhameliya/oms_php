import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../commonLink/Axios";
const initialState = {
  response: [],
  status: "idle",
  error: [],
};

export const ExportSlice = createAsyncThunk(
  "ExportSlice",
  async (payload, thunkAPI) => {
    // // console.log("add enter", payload);
    try {
      const response = await axios({
        method: "post",
        url: "api/auth/transaction_report",
        data: payload,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`,
        },
      });
      let data = await response.data;
        return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const Exportslice = createSlice({
  name: "Exportslice",
  initialState,

  reducers: {
    Exportstatus: (state) => {
      state.status = "idle";
    }
  },
  extraReducers(builder) {
    builder
      .addCase(ExportSlice.pending, (state) => {
        state.status = "loading";
        state.error = [];
        state.response = [];
      })
      .addCase(ExportSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
        state.error = [];
      })
      .addCase(ExportSlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = [];
        state.error = action.payload.response.data;
      });
  },
});

export const { Exportstatus } = Exportslice.actions;
export const Exportstate = (state) => state.export;

export default Exportslice.reducer;
