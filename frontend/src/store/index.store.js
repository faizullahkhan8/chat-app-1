import { configureStore } from "@reduxjs/toolkit";
import user from "./user.slice.js";
import selectedConversation from "./selectedConversation.slice.js";

const store = configureStore({
    reducer: { user, selectedConversation },
});

export default store;
