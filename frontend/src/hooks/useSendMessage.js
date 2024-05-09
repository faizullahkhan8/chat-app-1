import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// send message logic
const useSendMessage = () => {
    const [loading, setLoading] = useState(false);

    const sendMessage = async (message, reciverId) => {
        setLoading(true);

        try {
            const response = await axios.post(
                `http://localhost:8000/api/message/send/${reciverId}`,
                { message },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.error) {
                throw new Error(response.error);
            }

            return response;
        } catch (error) {
            console.log("[ERROR IN SEND MESSAGE]", error.message);
            toast.error(error.data.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
