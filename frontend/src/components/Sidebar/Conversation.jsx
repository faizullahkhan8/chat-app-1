import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../store/selectedConversation.slice.js";

// ICON
import { useSocketContext } from "../../contexts/Socket.context.jsx";

const Conversation = ({ conversation }) => {
    const _id = useSelector((state) => state.selectedConversation._id);
    const dispatch = useDispatch();

    const handleClick = (e) => {
        dispatch(
            setSelectedConversation({
                _id: conversation._id,
                username: conversation.username,
            })
        );
    };

    const { onlineUsers } = useSocketContext();

    const selected = _id === conversation._id;
    const isOnline = onlineUsers?.includes(conversation._id);

    return (
        <div
            onClick={handleClick}
            className={`w-full flex items-center rounded-md transition p-1 ${
                selected ? "bg-sky-500" : ""
            } hover:bg-sky-500 cursor-pointer gap-2`}
        >
            <div
                className={`w-12 h-12 rounded-full avatar ${
                    isOnline ? " online" : ""
                }`}
            >
                <img
                    src={conversation.profilePicture}
                    alt=""
                    className="w-12 h-12 rounded-full"
                />
            </div>

            <div className="flex flex-1 items-center justify-center">
                <h1 className="font-bold text-slate-300">
                    {conversation.name}
                </h1>
            </div>
        </div>
    );
};

export default Conversation;
