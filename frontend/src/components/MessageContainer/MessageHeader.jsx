import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as timeago from "timeago.js";
import { useSocketContext } from "../../contexts/Socket.context.jsx";

const MessageHeader = () => {
    const [lastOfflineTime, setLastOfflineTime] = useState();

    const receiverId = useSelector((state) => state.selectedConversation._id);

    const { socket } = useSocketContext();

    useEffect(() => {
        socket.on("getLastOfflineTime", (temp) => {
            const temp2 = temp.filter((temp2) => temp2.userId === receiverId);
            console.log(temp2);
        });
    }, [receiverId]);

    const username = useSelector(
        (state) => state.selectedConversation.username
    );

    return (
        <div className=" flex flex-col items-start p-2 bg-white w-full h-auto rounded-md">
            <p className="text-sky-500 ">To: {username}</p>
            <p>last seen :{lastOfflineTime} </p>
        </div>
    );
};

export default MessageHeader;
