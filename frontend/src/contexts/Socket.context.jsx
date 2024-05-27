import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const _id = useSelector((state) => state.user._id);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUser] = useState(null);

    useEffect(() => {
        if (isAuth) {
            const tempSocket = io("http://localhost:8000", {
                query: {
                    userId: _id,
                },
            });

            setSocket(tempSocket);

            tempSocket.on("getOnlineUsers", (event) => {
                setOnlineUser(event);
            });

            return () => tempSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [_id, isAuth]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
