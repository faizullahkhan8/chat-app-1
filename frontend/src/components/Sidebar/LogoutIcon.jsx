import React from "react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUser } from "../../store/user.slice.js";
import useLogout from "../../hooks/useLogout.js";
import { toast } from "react-toastify";
import { resetSelectedConversation } from "../../store/selectedConversation.slice.js";

const LogoutIcon = () => {
    const navigate = useNavigate();
    const dispathch = useDispatch();
    const { Logout, loading } = useLogout();

    const handleLogout = async () => {
        const response = await Logout();

        if (response?.status === 200) {
            dispathch(resetUser());
            dispathch(resetSelectedConversation());
            toast.success("Logout sucessfully");
            navigate("/login");
        }
    };

    return (
        <div
            onClick={handleLogout}
            className="text-white flex items-center gap-2 hover:text-sky-500 w-max cursor-pointer"
        >
            <MdLogout className=" text-3xl rotate-180 mt-2 " />
            {loading ? "loading" : "Logout"}
        </div>
    );
};

export default LogoutIcon;
