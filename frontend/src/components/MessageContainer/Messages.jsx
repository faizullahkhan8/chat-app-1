import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages.js";
import { useMessagesContext } from "../../contexts/messages.context.jsx";
import { useMessageListener } from "../../hooks/useMessageListener.js";

const Messages = () => {
    const lastIdxRef = useRef();
    const { loading } = useGetMessages();
    const { messages } = useMessagesContext();

    useMessageListener();

    useEffect(() => {
        setTimeout(() => {
            lastIdxRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className="flex flex-col  flex-1 gap-2 overflow-y-auto">
            {loading ? (
                <div className="loading loading-spinner" />
            ) : messages.length < 1 ? (
                <div className="text-center">No message yet</div>
            ) : (
                messages.map((message) => {
                    return (
                        <div key={message._id} ref={lastIdxRef}>
                            <Message message={message} />
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Messages;
