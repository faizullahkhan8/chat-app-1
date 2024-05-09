// components imports
import SearchInput from "./SearchInput";
import Conversations from "./Conversations.jsx";
import LogoutIcon from "./LogoutIcon.jsx";

const Sidebar = () => {
    return (
        <div className="flex flex-col">
            <SearchInput />
            <Conversations />
            <LogoutIcon />
        </div>
    );
};

export default Sidebar;
