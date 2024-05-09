import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/user",
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

                setConversations(response.data);

                return () => setConversations([]);
            } catch (error) {
                console.log("[ERROR IN GETCONVERSATION]", error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { conversations, loading };
};

export default useGetConversations;
