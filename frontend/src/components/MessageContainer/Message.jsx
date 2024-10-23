import React from "react";
import { useSelector } from "react-redux";
import * as timeago from "timeago.js";
import { AiFillCheckCircle } from "react-icons/ai";
import { useSocketContext } from "../../contexts/Socket.context.jsx";

const Message = ({ message }) => {
    const userId = useSelector((state) => state.user._id);
    const createdAt = timeago.format(message.createdAt);

    const { onlineUsers } = useSocketContext();

    const receiver = useSelector((state) => state.selectedConversation);

    const isOnline = onlineUsers?.includes(receiver._id);

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
                <div className="flex items-center gap-2 chat-footer">
                    <p className="text-xs opacity-50 ml-2">{createdAt}</p>
                    {userId === message.sender && (
                        <p
                            className={`${
                                isOnline ? "text-green-500" : "text-gray-500"
                            }`}
                        >
                            <AiFillCheckCircle />
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
