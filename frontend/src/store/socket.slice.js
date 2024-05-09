import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socket: null,
    onLineUser: [],
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload.socket;
            state.onLineUser = action.payload.onLineUser;
        },
        resetSocket: (state, action) => {
            state.socket = null;
            state.onLineUser = [];
        },
    },
});

export const { setSocket, resetSocket } = socketSlice.actions;

export default socketSlice.reducer;
