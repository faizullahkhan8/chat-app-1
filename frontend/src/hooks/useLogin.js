import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const useLogin = () => {
    const [loading, setLoading] = useState();

    const Login = async (data) => {
        const { username, password } = data;
        const success = validataLoginData({ username, password });

        if (!success) {
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/login",
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.error) {
                console.log(response.response);
            }

            return response;
        } catch (error) {
            console.log("[ERROR IN USE-LOGIN]");
            toast.error(error.response.data);
        } finally {
            setLoading(false);
        }
    };
    return { Login, loading };
};

export default useLogin;

const validataLoginData = ({ username, password }) => {
    if (!username || !password) {
        toast.error("Please fill all the fields");
        return false;
    }
    return true;
};
