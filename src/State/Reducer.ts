import { combineReducers } from "@reduxjs/toolkit";
import user from "./Slices/user";

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
