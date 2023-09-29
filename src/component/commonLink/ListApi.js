import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../commonLink/Axios";

const initialState = {
  List: [],
  status: "idle",
  error: '',
};
export const ListFetch = createAsyncThunk("resource/get", async (dberr,thunkAPI ) => {
  try {
    const response = await axios({
      method: "GET",
      url: "api/auth/all_list",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`,
      },
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const ListSlice = createSlice({
  name: "ListSlice",
  initialState,

  reducers: {
    listfetchstate: (state) => {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(ListFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ListFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.List = action.payload;
      })
      .addCase(ListFetch.rejected, (state, action) => {
        state.status = "failed";
        // console.log("failed", action);
        state.error = action.payload.message;
      });
  },
});

export const { listfetchstate } = ListSlice.actions;

export const Liststate = (state) => state.productList;

export default ListSlice.reducer;
