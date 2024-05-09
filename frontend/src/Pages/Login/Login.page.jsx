import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// states related
import { setUser } from "../../store/user.slice.js";
import { useDispatch } from "react-redux";

// notification
import { toast } from "react-toastify";

// hooks
import useLogin from "../../hooks/useLogin.js";

const LoginPage = () => {
    // instances
    const navigate = useNavigate();
    const { Login, loading } = useLogin();
    const dispatch = useDispatch();

    // const _id = useSelector((state) => state.user._id);
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    // get user data from inputs
    const getUserData = (e) => {
        setData((pre) => ({ ...pre, [e.target.id]: e.target.value }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await Login(data);

        if (response?.status === 200) {
            dispatch(setUser(response.data));

            // // socket set up
            // const socket = io("http://localhost:8000", {
            //     query: {
            //         userId: response.data._id,
            //     },
            // });

            // socket.on("getOnlineUsers", (onLineUser) => {
            //     dispatch(setSocket({ onLineUser }));
            // });

            // dispatch(setSocket({ socket }));

            // socketCon();
            toast.success("Loged in successfully");
            navigate("/");
        }
    };

    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center">
                <form className="w-3/5 flex items-center justify-center flex-col p-6 border border-blue-500 rounded-lg gap-4 backdrop-filter backdrop-blur-md">
                    <h1 className="text-4xl text-blue-500 font-bold"> Login</h1>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username..."
                        className="bg-slate-300 rounded-md text-xl w-full p-2 outline-none"
                        value={data.username}
                        onChange={getUserData}
                    />
                    <input
                        id="password"
                        type="text"
                        placeholder="Password..."
                        className="bg-slate-300 rounded-md text-xl w-full p-2 outline-none border-b-2 border-slate-400"
                        value={data.password}
                        onChange={getUserData}
                    />

                    <button
                        onClick={handleLogin}
                        className="bg-blue-500 w-full p-2 text-white font-bold rounded-md border border-transparent hover:bg-transparent hover:border-blue-500 hover:text-blue-500 transition duration-400"
                    >
                        {loading ? "Loading" : "Login"}
                    </button>
                    <div className="flex flex-col items-center gap-2">
                        <p>Not have an Account</p>
                        <Link
                            to="/register"
                            className="text-2xl font-bold text-blue-600"
                        >
                            {loading ? (
                                <div className="loading loading-spinner" />
                            ) : (
                                "Register"
                            )}
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
