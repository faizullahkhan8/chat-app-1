import { useEffect } from "react";
import { useSocketContext } from "../contexts/Socket.context";
import { useMessagesContext } from "../contexts/messages.context";

export const useMessageListener = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useMessagesContext();
    useEffect(() => {
        socket?.on("newMessage", (message) => {
            setMessages([...messages, message]);
        });

        return () => socket?.off("newMessage");
    }, [messages, socket, setMessages]);
};
