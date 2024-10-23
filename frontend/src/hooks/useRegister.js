import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useRegister = () => {
    const [loading, setLoading] = useState(false);

    const register = async (data) => {
        const success = handleInputErrors(data);
        if (!success) return;
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/register",
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
            console.log("[ERROR IN USE-REGISTER]");
            toast.error(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return { register, loading };
};

export default useRegister;

const handleInputErrors = (data) => {
    const { name, username, password, confirmPassword, gender } = data;

    if (!name || !username || !password || !confirmPassword || !gender) {
        toast.error("please fill all the fields");
        return false;
    }

    if (username.length < 6) {
        toast.error("username must be 6 character long");
        return false;
    }

    if (password.length < 6) {
        toast.error("password must be 6 character long");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("confirm password must match");
        return false;
    }

    return true;
};
