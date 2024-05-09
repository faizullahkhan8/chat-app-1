import { configureStore } from "@reduxjs/toolkit";
import user from "./user.slice.js";
import selectedConversation from "./selectedConversation.slice.js";

import socket from "./socket.slice.js";

const store = configureStore({
    reducer: { user, selectedConversation, socket },
});

export default store;
