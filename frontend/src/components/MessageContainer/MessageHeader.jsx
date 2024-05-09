import React from "react";
import { useSelector } from "react-redux";

const MessageHeader = () => {
    const username = useSelector(
        (state) => state.selectedConversation.username
    );
    return (
        <div className=" flex items-center p-2 bg-white w-full h-12 rounded-md">
            <p className="text-sky-500 ">To: {username}</p>
        </div>
    );
};

export default MessageHeader;
