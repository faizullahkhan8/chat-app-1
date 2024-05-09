import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations.js";

const Conversations = () => {
    const { conversations, loading } = useGetConversations();

    return loading ? (
        "working on it"
    ) : (
        <div className="flex flex-1 h-max flex-col gap-2 mt-2 overflow-y-auto scroll-smooth">
            {conversations.length < 1 ? (
                <p className="text-white">No user</p>
            ) : (
                conversations.map((conversation, index) => {
                    return (
                        <Conversation
                            key={conversation._id}
                            conversation={conversation}
                            lastIndex={index === conversations.length - 1}
                        />
                    );
                })
            )}
        </div>
    );
};

export default Conversations;
