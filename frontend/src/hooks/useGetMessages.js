import { useEffect, useState } from "react";
import axios from "axios";
import { useMessagesContext } from "../contexts/messages.context.jsx";
import { useSelector } from "react-redux";
import { useSocketContext } from "../contexts/Socket.context.jsx";

const useGetMessages = () => {
    const [loading, setLoading] = useState();
    const { setMessages, messages } = useMessagesContext();
    const { socket } = useSocketContext();

    const conversationId = useSelector(
        (state) => state.selectedConversation?._id
    );

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                let response = await axios.get(
                    `http://localhost:8000/api/message/${conversationId}`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    setMessages(response.data.messages);
                    return (response = null);
                }

                return response;
            } catch (error) {
                console.log("[ERROR IN GET MESSAGES]", error.response);
                return error;
            } finally {
                setLoading(false);
            }
        };

        if (conversationId) getMessages();
    }, [conversationId]);

    return { loading };
};

export default useGetMessages;
