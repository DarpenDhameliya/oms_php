import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const OrderReturnfetchSlice = createAsyncThunk(
    "OrderReturnfetchSlice",
    async (payload, thunkAPI) => {
      // console.log('add enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/get_returndata',
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

export const Orderreturnfetchslice = createSlice({
  name: "Orderreturnfetchslice",
  initialState,

  reducers: {
    Orderreturnfetchstatus:(state) => {
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(OrderReturnfetchSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(OrderReturnfetchSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = []
      })
      .addCase(OrderReturnfetchSlice.rejected, (state, action) => {
        state.status = "failed";
        // console.log(action)
        state.response = []
        state.error = action.payload.response.data;
      });
  },
});

export const { Orderreturnfetchstatus } = Orderreturnfetchslice.actions;

export const Orderreturnfetchstate = (state) => state.orderreturnfetch;

export default Orderreturnfetchslice.reducer;