import { configureStore } from "@reduxjs/toolkit";
import phoneNumberReducer from "../slices/phoneNumberSlice";

const store = configureStore({
  reducer: {
    phoneNumbers: phoneNumberReducer,
  },
});

export default store;
