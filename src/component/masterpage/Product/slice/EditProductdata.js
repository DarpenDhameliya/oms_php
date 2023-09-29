import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../commonLink/Axios'
const initialState = {
  response:[],
  status: "idle",
  error:[]
};

export const EditProductdata = createAsyncThunk(
    "EditProductdata",
    async (id  , thunkAPI) => {
      // console.log('enter',id)
      try {
        const response = await axios({
          method: "get",
          url: `api/auth/get_product/${id}`,
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`
          },
        });
        let data = await response.data;  

          return data;

      } catch (e) {
        // console.log("Error", e.response.data);
        return thunkAPI.rejectWithValue(e);
      }
    }
  );

export const Editproductslice = createSlice({
  name: "Editproductslice",
  initialState,

  reducers: {
    updateproducteditstate:(state) => {
      state.status = 'idle'
    },

  },
  extraReducers(builder) {
    builder
      .addCase(EditProductdata.pending, (state) => {
        state.status = "loading";
        state.response = []
        state.error = []
      })
      .addCase(EditProductdata.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload)
        state.response = action.payload.product_detail
        state.error = []
      })
      .addCase(EditProductdata.rejected, (state, action) => {
        state.status = "failed";
        state.response = []
        state.error = action.payload.response.data;
      })
  },
});

export const { updateproducteditstate } = Editproductslice.actions;

export const Editproductstate = (state) => state.editproduct;

export default Editproductslice.reducer;