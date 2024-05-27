import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage.js";
import { useSelector } from "react-redux";
import sendSound from "../../sounds/send-sound.m4a";

const MessageInput = ({ setMessages }) => {
    const reciverId = useSelector((state) => state.selectedConversation._id);
    const [messsage, setMessage] = useState("");
    const inputEmpty = messsage.length < 1;
    const sendSoundInstance = new Audio(sendSound);

    const { sendMessage, loading } = useSendMessage();

    const handleSend = async (event) => {
        event.preventDefault();
        const response = await sendMessage(messsage, reciverId);

        if (response.status === 200) {
            setMessages((pre) => [...pre, response.data.message]);
            sendSoundInstance.play();
            setMessage("");
        }
    };

    return (
        <form className="flex items-center gap-2 bg-white w-full h-12 rounded-md p-2">
            <input
                type="text"
                placeholder="Send a message..."
                className="flex-1 outline-none"
                autoFocus
                value={messsage}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSend} disabled={inputEmpty}>
                {loading ? (
                    <div className="loading loading-spinner" />
                ) : (
                    <BsSend
                        className={`text-xl w-8 cursor-pointer ${
                            inputEmpty ? "text-gray-500" : "text-sky-500"
                        }`}
                    />
                )}
            </button>
        </form>
    );
};

export default MessageInput;
