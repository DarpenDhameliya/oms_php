import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const url = "api/auth/add_product";
const initialState = {
  response:'',
  status: "idle",
  error:[]
};

export const AddProductSlice = createAsyncThunk(
    "AddProductSlice",
    async (payload, thunkAPI) => {
      console.log('enter',payload)
      try {
        const response = await axios({
          method: "post",
          url: url,
          data:payload,
          headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;  
          return data;

      } catch (e) {

        // console.log("Error", e);
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Addproductslice = createSlice({
  name: "Addproductslice",
  initialState,

  reducers: {
    updateProductAddSlice:(state) => {
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(AddProductSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddProductSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload
        state.error = ''
      })
      .addCase(AddProductSlice.rejected, (state, action) => {
        state.status = "failed";
        // console.log(action)
        state.error = action.payload.response.data;
      });
  },
});

export const { updateProductAddSlice } = Addproductslice.actions;

export const Addproductstate = (state) => state.addproduct;

export default Addproductslice.reducer;