import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import MessageHeader from "./MessageHeader";
import { useSelector } from "react-redux";
import NoMessagePlaceholder from "./NoMessagePlaceholder";
import axios from "axios";

const MessageContainer = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const conversationId = useSelector(
        (state) => state.selectedConversation._id
    );

    // useEffect for get messages
    useEffect(() => {
        async function getMessages() {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/message/${conversationId}`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    const data = response.data.messages;
                    setMessages(data);
                }

                return response;
            } catch (error) {
                console.log("[ERROR IN GET MESSAGES]", error.response);
                return error;
            } finally {
                setLoading(false);
            }
        }

        if (conversationId) getMessages();

        return () => setMessages([]);
    }, [conversationId, setMessages]);

    return (
        <div className="flex flex-1 flex-col w-[450px] bg-slate-300 rounded-md p-2 gap-3">
            <MessageHeader />
            {conversationId ? (
                <>
                    <Messages
                        messages={messages}
                        loading={loading}
                        setMessages={setMessages}
                    />
                    <MessageInput setMessages={setMessages} />
                </>
            ) : (
                <NoMessagePlaceholder username={"some one"} />
            )}
        </div>
    );
};

export default MessageContainer;
