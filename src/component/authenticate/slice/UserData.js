import { createSlice } from "@reduxjs/toolkit";
const initialState = {
token:'',
name:'',
email:''
};

export const UserDataSlice = createSlice({
  name: "userdata",
  initialState,

  reducers: {
    Userdataslice:(state,data) => {
      // console.log(data.payload)
      state.token = data.payload
    },

  },
});

export const { Userdataslice } = UserDataSlice.actions;

export const Usersatastate = (state) => state.userdata;

export default UserDataSlice.reducer;
