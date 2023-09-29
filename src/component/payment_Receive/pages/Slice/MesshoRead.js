import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:'',
  status: "idle",
  error:[]
};

export const MesshoReadSlice = createAsyncThunk(
    "MesshoReadSlice",
    async (payload, thunkAPI) => {
      try {
        const response = await axios({
          method: "post",
          url: 'api/auth/meesho_payment_update',
          data:payload,
          headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;  
        console.log(data)
        if (data.status === true) {
          return data;
        } 
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Messhoreadslice = createSlice({
  name: "Messhoreadslice",
  initialState,

  reducers: {
    Messhoreadstatus:(state) => {
      state.status = 'idle'
    },
    
  },
  extraReducers(builder) {
    builder
    .addCase(MesshoReadSlice.pending, (state) => {
      state.status = "loading";
    })
    .addCase(MesshoReadSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log('===========================><<<<<',action)
        state.response = action.payload
        state.error = []
      })
      .addCase(MesshoReadSlice.rejected, (state, action) => {
        state.status = "failed";
        console.log('===========================>',action)
        state.error = action.payload.response.data;
      });
    },
  });
  
export const { Messhoreadstatus } = Messhoreadslice.actions;

export const Messhoreadstate = (state) => state.messhoreadpayment;

export default Messhoreadslice.reducer;