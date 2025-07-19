import { configureStore } from "@reduxjs/toolkit";
import phoneNumberReducer from "../slices/phoneNumberSlice";
import assistantsReducer from "../slices/assistantSlice";

const store = configureStore({
  reducer: {
    phoneNumbers: phoneNumberReducer,
    assistants: assistantsReducer,
  },
});

export default store;
