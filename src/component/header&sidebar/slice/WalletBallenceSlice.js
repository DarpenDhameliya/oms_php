import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../commonLink/Axios'
const initialState = {
  responce: "",
  status: "idle",
  error:[],
};


export const WalletBallenceSlice = createAsyncThunk(
    "WalletBallenceSlice",
    async (payload, thunkAPI) => {
      try {
        const response = await axios({
          method: "get",
          url: 'api/auth/Wallet_balance',
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`,
          },
        });
        let data = await response.data;    
        return data; 
      } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );

export const Walletballenceslice = createSlice({
  name: "Walletballenceslice",
  initialState,

  reducers: {
    Walletballencestatus:(state) => {
      state.status = 'idle'
    },

  },
  extraReducers(builder) {
    builder
      .addCase(WalletBallenceSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(WalletBallenceSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload.wallet_balance[0].wallet_balance)
        state.responce = action.payload.wallet_balance[0].wallet_balance;
      })
      .addCase(WalletBallenceSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { Walletballencestatus } = Walletballenceslice.actions;

export const Walletballencestate = (state) => state.walletballence;

export default Walletballenceslice.reducer;
