import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import useGetConversations from "../../hooks/useGetConversations";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../store/selectedConversation.slice.js";
import { toast } from "react-toastify";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const prevConversation = useSelector(
        (state) => state.selectedConversation._id
    );
    const username = useSelector((state) => state.user.username);
    const { conversations } = useGetConversations();
    const dispatch = useDispatch();
    const handleSearch = (event) => {
        event.preventDefault();
        const conversation = conversations.find((c) => {
            return c.name.toLowerCase().includes(search.toLowerCase());
        });

        if (prevConversation === conversation?._id) {
            toast.error("Conversation already active");
            return;
        }

        if (conversation) {
            dispatch(setSelectedConversation({ _id: conversation._id }));
        } else toast.error("User not found");
    };

    return (
        <div className="flex items-center gap-4 flex-col">
            <form className="flex gap-2">
                <input
                    type="text"
                    placeholder={`@${username}`}
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-300 rounded-full text-black py-2 px-4 placeholder:text-slate-500 outline-none"
                />
                <button
                    onClick={handleSearch}
                    className="bg-sky-500 rounded-full p-1"
                >
                    <MdSearch className="text-white w-8 h-8" />
                </button>
            </form>
            <div className="bg-slate-500 w-full h-[1px] " />
        </div>
    );
};

export default SearchInput;
