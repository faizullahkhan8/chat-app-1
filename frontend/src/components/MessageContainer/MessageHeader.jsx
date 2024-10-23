import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetOfflineTime from "../../hooks/useGetOfflineTime.js";
import * as timesago from "timeago.js";
import { useSocketContext } from "../../contexts/Socket.context.jsx";

const MessageHeader = () => {
    const [lastOfflineTime, setLastOfflineTime] = useState();

    const { getOfflineTime } = useGetOfflineTime();

    const { onlineUsers } = useSocketContext();

    const receiver = useSelector((state) => state.selectedConversation);

    const isOnline = onlineUsers?.includes(receiver._id);

    useEffect(() => {
        (async () => {
            const response = await getOfflineTime({ userId: receiver._id });
            setLastOfflineTime(response?.data.offlineAt);
        })();
    }, [receiver, isOnline, setLastOfflineTime]);

    return (
        <div className=" flex flex-col items-start p-2 bg-white w-full h-auto rounded-md">
            <p className="text-sky-500 ">To: {receiver.username}</p>
            {receiver._id
                ? !isOnline && (
                      <p>last seen : {timesago.format(lastOfflineTime)}</p>
                  )
                : ""}
        </div>
    );
};

export default MessageHeader;
