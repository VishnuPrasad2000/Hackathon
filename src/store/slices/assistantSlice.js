import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assistants: [],
  tools: [],
};

const assistantsSlice = createSlice({
  name: "assistants",
  initialState,
  reducers: {
    setAllAssistants: (state, action) => {
      state.assistants = action.payload;
    },
    setTools: (state, action) => {
      state.tools = action.payload;
    },
  },
});

export const { setAllAssistants, setTools } = assistantsSlice.actions;

export default assistantsSlice.reducer;
