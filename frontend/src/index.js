import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { SocketContextProvider } from "./contexts/Socket.context.jsx";

import { Provider } from "react-redux";
import store from "./store/index.store.js";

import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <SocketContextProvider>
                <ToastContainer
                    theme="light"
                    position="top-center"
                    pauseOnHover={false}
                    pauseOnFocusLoss={false}
                    autoClose={2000}
                />
                <App />
            </SocketContextProvider>
        </Provider>
    </React.StrictMode>
);
