import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const userId = useSelector((state) => state.user._id);
    const createdAt = new Date(message.createdAt).toLocaleTimeString();

    return (
        <div className={`flex flex-col`}>
            <div
                className={`chat ${
                    userId !== message.sender ? "chat-start" : "chat-end"
                }`}
            >
                <div
                    className={`${
                        userId !== message.sender
                            ? "chat-bubble chat-bubble-primary"
                            : "chat-bubble"
                    }`}
                >
                    {message.message}
                </div>
                <p className="text-xs opacity-50 ml-2 chat-footer">
                    {createdAt}
                </p>
            </div>
        </div>
    );
};

export default Message;
