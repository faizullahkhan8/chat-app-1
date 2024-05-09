import axios from "axios";
import { useState } from "react";

const useLogout = () => {
    const [loading, setLoading] = useState();

    const Logout = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/logout",
                { undefined },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.error) throw new Error(response.error);

            return response;
        } catch (error) {
            console.log("[ERROR IN LOGOUT]", error.message);
        } finally {
            setLoading(false);
        }
    };
    return { Logout, loading };
};

export default useLogout;
