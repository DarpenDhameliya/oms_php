import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../commonLink/Axios";
const initialState = {
  response: "",
  status: "idle",
  error: [],
};

export const DeleteProductSlice = createAsyncThunk(
  "DeleteProductSlice",
  async (id, thunkAPI) => {
    // console.log("enter", id);
    try {
      const response = await axios({
        method: "delete",
        url: `api/auth/delete_Product/${id}`,
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

export const Deleteproductslice = createSlice({
  name: "Addproductslice",
  initialState,

  reducers: {
    updateProductstateaction: (state) => {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(DeleteProductSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteProductSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(DeleteProductSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { updateProductstateaction } = Deleteproductslice.actions;
export const Deleteproductstate = (state) => state.deleteproduct;

export default Deleteproductslice.reducer;
