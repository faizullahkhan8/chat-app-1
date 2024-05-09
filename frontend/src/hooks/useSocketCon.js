import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "../store/socket.slice.js";

const useSocketCon = () => {
    const [loading, setLoading] = useState(false);
    const _id = useSelector((state) => state.user._id);
    const dispatch = useDispatch();

    const socketCon = () => {
        setLoading(true);
        try {
            const socket = io("http://localhost:8000", {
                query: {
                    userId: _id,
                },
            });

            socket.on("getOnlineUser", (onLineUser) => {
                dispatch(setSocket({ onLineUser, socket }));
                console.log(onLineUser);
            });
            dispatch(setSocket({ socket }));
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { socketCon, loading };
};

export default useSocketCon;
