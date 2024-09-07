import {createSlice} from '@reduxjs/toolkit'


export const userBasicDetailsSlice = createSlice(
   {
    name: 'user_basic_details',
    initialState: {
      id : null,
      name: null,
      profile_pic:null,
      email:null,
    },
    reducers: {
      set_user_basic_details: (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.profile_pic = action.payload.profile_pic; 
        state.email = action.payload.email;

      }
    }


})

export const {set_user_basic_details} =  userBasicDetailsSlice.actions

export default userBasicDetailsSlice.reducer