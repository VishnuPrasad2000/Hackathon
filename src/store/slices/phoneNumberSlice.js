import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phoneNumbers: [],
};

const phoneNumberSlice = createSlice({
  name: "phoneNumbers",
  initialState,
  reducers: {
    setAllPhoneNumbers: (state, action) => {
      state.phoneNumbers = action.payload;
    },
  },
});

export const { setAllPhoneNumbers } = phoneNumberSlice.actions;

export default phoneNumberSlice.reducer;
