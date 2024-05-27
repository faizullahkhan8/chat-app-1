import { useEffect } from "react";
import { useSocketContext } from "../contexts/Socket.context";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import messageAudio from "../sounds/Recording.m4a";

export const useMessageListener = ({ setMessages }) => {
    const audio = new Audio(messageAudio);
    const { socket } = useSocketContext();
    const currentUser = useSelector((state) => state.user._id);
    useEffect(() => {
        function MessageListener() {
            socket?.on("newMessage", (message) => {
                setMessages((pre) => [...pre, message]);
                if (message.sender !== currentUser) {
                    toast.success("New Message");
                    audio.play();
                }
            });
        }

        if (socket) MessageListener();

        return () => socket.off("newMessage");
    }, [socket, setMessages]);
};
