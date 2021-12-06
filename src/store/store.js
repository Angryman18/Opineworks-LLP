import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlicer";

const store = configureStore({
  reducer: { userSlicer: userReducer },
});

export default store;
