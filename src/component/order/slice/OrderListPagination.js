import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const OrderListPaginationSlice = createAsyncThunk(
    "OrderListPaginationSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: `api/auth/order_report?page=${payload.page}`,
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

export const Orderlispaginationtslice = createSlice({
  name: "Orderlispaginationtslice",
  initialState,

  reducers: {
    Orderlispaginationtstatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
      .addCase(OrderListPaginationSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(OrderListPaginationSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(OrderListPaginationSlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = []
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Orderlispaginationtstatus } = Orderlispaginationtslice.actions;

export const Orderlispaginationtstate = (state) => state.orderlistpagination;

export default Orderlispaginationtslice.reducer;