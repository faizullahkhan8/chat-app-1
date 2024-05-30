import axios from "axios";
import { useState } from "react";

const useGetOfflineTime = () => {
    const [loading, setLoading] = useState(false);
    const [offlineTime, setOfflineTime] = useState([]);

    const getOfflineTime = async ({ userId }) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8000/api/user/getOfflineTime/${userId}`
            );

            if (response) return response;
        } catch (error) {
            return console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, getOfflineTime };
};

export default useGetOfflineTime;
