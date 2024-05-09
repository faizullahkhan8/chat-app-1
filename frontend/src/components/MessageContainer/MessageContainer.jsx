import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import MessageHeader from "./MessageHeader";
import { useSelector } from "react-redux";
import NoMessagePlaceholder from "./NoMessagePlaceholder";

const MessageContainer = () => {
    const selectedConversation = useSelector(
        (state) => state.selectedConversation._id
    );
    return (
        <div className="flex flex-1 flex-col w-[450px] bg-slate-300 rounded-md p-2 gap-3">
            <MessageHeader />
            {selectedConversation ? (
                <>
                    <Messages />
                    <MessageInput />
                </>
            ) : (
                <NoMessagePlaceholder username={"some one"} />
            )}
        </div>
    );
};

export default MessageContainer;
