import { configureStore } from "@reduxjs/toolkit";

import {

  addFriendReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userProfileUpdateReducer,
  userRegisterReducer,
 
} from "./reducer/userReducer";

const localStorageUserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;



const preloadedState = {
  userLogin: {
    userInfo: localStorageUserInfo,
  },
 
};

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    userDetails: userDetailsReducer,
    userProfileUpdate: userProfileUpdateReducer,
    addFriend: addFriendReducer,
  },
  preloadedState,
});

export default store;