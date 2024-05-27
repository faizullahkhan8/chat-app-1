import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// redux states
import { setUser } from "../../store/user.slice.js";
import { useDispatch } from "react-redux";

// icons import
import useRegister from "../../hooks/useRegister.js";
import { toast } from "react-toastify";

const RegisterPage = () => {
    // states
    const { register, loading } = useRegister();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // user data object
    const [data, setData] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    // get user data from the inputs
    const handleRegisterData = (e) => {
        setData((pre) => ({ ...pre, [e.target.id]: e.target.value }));
    };

    const handleSubmitData = async (event) => {
        event.preventDefault();
        const res = await register(data);

        if (res?.status === 201) {
            dispatch(setUser(res.data));
            toast.success("user registred succesfully");
            navigate("/");
        }
    };

    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center">
                <form
                    className="w-3/5 flex items-center justify-center flex-col p-6 border border-blue-500 rounded-lg gap-4 shadow-lg shadow-slate-600 overflow-hidden  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0
                
                "
                >
                    <h1 className="text-2xl text-blue-500 font-bold">
                        {" "}
                        Register{" "}
                    </h1>
                    <input
                        id="name"
                        type="text"
                        placeholder="Name..."
                        className="rounded-md w-full p-2 bg-slate-300 outline-none"
                        value={data.name}
                        onChange={handleRegisterData}
                    />
                    <input
                        id="username"
                        type="text"
                        placeholder="Username..."
                        className="rounded-md w-full p-2 bg-slate-300 outline-none"
                        value={data.username}
                        onChange={handleRegisterData}
                    />
                    <input
                        id="password"
                        type="password"
                        placeholder="Password..."
                        className="rounded-md w-full p-2 bg-slate-300 outline-none"
                        value={data.password}
                        onChange={handleRegisterData}
                    />
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password..."
                        className="rounded-md w-full p-2 bg-slate-300 outline-none"
                        value={data.confirmPassword}
                        onChange={handleRegisterData}
                    />
                    <div className="flex gap-4 text-white">
                        <div className="">
                            <label
                                className={
                                    data.gender === "male" ? "text-sky-500" : ""
                                }
                            >
                                Male
                            </label>
                            <input
                                id="gender"
                                type="radio"
                                name="gender"
                                value="male"
                                className="mx-2"
                                // checked={data.gender === "male"}
                                onChange={handleRegisterData}
                            />
                        </div>
                        <div className="">
                            <label
                                className={
                                    data.gender === "female"
                                        ? "text-sky-500"
                                        : ""
                                }
                            >
                                Female
                            </label>
                            <input
                                id="gender"
                                type="radio"
                                name="gender"
                                value="female"
                                className="mx-2"
                                // checked={data.gender === "female"}
                                onChange={handleRegisterData}
                            />
                        </div>
                    </div>
                    {/* <div className="flex items-center gap-2 text-red-600 font-bold">
                        <MdError />
                        <p>this is an error</p>
                    </div> */}
                    <button
                        onClick={handleSubmitData}
                        className="bg-blue-500 w-full p-2 text-white font-bold rounded-md border border-transparent hover:bg-transparent hover:border-blue-500 hover:text-blue-500 transition duration-400"
                    >
                        {loading ? "loading" : "Register"}
                    </button>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-white">Already have an Account</p>
                        <Link
                            to="/login"
                            className="text-2xl font-bold text-blue-600 after:bg-black"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegisterPage;
