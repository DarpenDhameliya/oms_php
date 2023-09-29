// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../../commonLink/Axios";
// const initialState = {
//   response: [],
//   status: "idle",
//   error: [],
// };

// export const PaymentCheckSlice = createAsyncThunk(
//   "PaymentCheckSlice",
//   async (payload, thunkAPI) => {
//     // console.log("add enter", payload);
//     try {
//       const response = await axios({
//         method: "post",
//         url: "api/auth/amount_receive",
//         data: payload,
//         headers: {
//           Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata"))}`,
//         },
//       });
//       let data = await response.data;
//         return data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );

// export const Paymentcheckslice = createSlice({
//   name: "Paymentcheckslice",
//   initialState,

//   reducers: {
//     Paymentcheckstatus:(state) => {
//       state.status = 'idle'
//     },
//     Paymentuncheckdata:(state , payload) => {
//       state.response = payload
//     }
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(PaymentCheckSlice.pending, (state) => {
//         state.status = "loading";
//         state.error = [];
//         state.response = [];
//       })
//       .addCase(PaymentCheckSlice.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         console.log(action);
//         state.response = action.payload
//         state.error = [];
//       })
//       .addCase(PaymentCheckSlice.rejected, (state, action) => {
//         state.status = "failed";
//         state.response = [];
//         state.error = action.payload.response.data;
//       });
//   },
// });

// export const {Paymentcheckstatus ,Paymentuncheckdata} = Paymentcheckslice.actions

// export const Paymentcheckstate = (state) => state.paymentcheck;

// export default Paymentcheckslice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../commonLink/Axios";
const initialState = {
  response: [],
  status: "idle",
  error: [],
};

export const PaymentSubmitSlice = createAsyncThunk(
  "PaymentSubmitSlice",
  async (payload, thunkAPI) => {
    try {
      const response = await axios({
        method: "post",
        url: "api/auth/amount_receive",
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

export const Paymentsubmitslice = createSlice({
  name: "Paymentsubmitslice",
  initialState,

  reducers: {
    Paymentsubmitchangestatus: (state) => {
      state.status = "idle";
    }
  },
  extraReducers(builder) {
    builder
      .addCase(PaymentSubmitSlice.pending, (state) => {
        state.status = "loading";
        state.error = [];
        state.response = [];
      })
      .addCase(PaymentSubmitSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action)
        state.response = action.payload;
        state.error = [];
      })
      .addCase(PaymentSubmitSlice.rejected, (state, action) => {
        state.status = "failed";
        state.response = [];
        state.error = action.payload.response.data;
      });
  },
});

export const { Paymentsubmitchangestatus } = Paymentsubmitslice.actions;
export const Paymentsubmitstate = (state) => state.paymentsubmit;

export default Paymentsubmitslice.reducer;

