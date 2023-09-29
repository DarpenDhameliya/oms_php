import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../commonLink/Axios'
const url = "api/auth/login";
const initialState = {
  token: "",
  status: "idle",
  error:[],
  user:[]
};


export const userLogin = createAsyncThunk(
    "userLogin",
    async (payload, thunkAPI) => {
      // console.log(payload)
      try {
        const response = await axios({
          method: "post",
          url: url,
          data:payload
        });
        let data = await response.data;    
        return data; 
      } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );

export const userSlice = createSlice({
  name: "userSlice",
  initialState,

  reducers: {
    LoginstatusSlice:(state) => {
      state.status = 'idle'
    },

  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        // console.log(action.payload.user)
        state.user = action.payload.user
        localStorage.setItem('userdata',JSON.stringify(action.payload.token))
        localStorage.setItem('username',JSON.stringify(action.payload.user[0].name))
        localStorage.setItem('useremail',JSON.stringify(action.payload.user[0].email))
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { LoginstatusSlice } = userSlice.actions;

export const userstate = (state) => state.login;

export default userSlice.reducer;
