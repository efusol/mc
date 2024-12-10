import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
  name : 'member',
  initialState : {
    user : null,
    admin: false,
  },
  reducers : {
    userLogin(state, action){
      state.user = action.payload
    },
    adminLogin(state, action){
      state.admin = action.payload
    },
    userLogout(state, action){
        state.user = null
        state.admin = false
    },
    updateUser(state, action) {
      state.user ={ ...action.payload};
      console.log("리듀서에서 받은 페이로드:", JSON.stringify(state.user));
    }
  }
})

export const { userLogin, adminLogin, userLogout, updateUser } = memberSlice.actions;

export default memberSlice.reducer;