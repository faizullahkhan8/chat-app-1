import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    username: "",
};

export const selectedConversation = createSlice({
    name: "selectedConversation",
    initialState,
    reducers: {
        setSelectedConversation: (state, action) => {
            state._id = action.payload._id;
            state.username = action.payload.username;
        },
        resetSelectedConversation: (state, action) => {
            state._id = "";
            state.username = "";
        },
    },
});

export const { setSelectedConversation, resetSelectedConversation } =
    selectedConversation.actions;

export default selectedConversation.reducer;
