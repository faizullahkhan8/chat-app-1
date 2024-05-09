import MessageContainer from "../../components/MessageContainer/MessageContainer";
import Sidebar from "../../components/Sidebar/Sidebar";

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
            <div className="flex w-[80%] h-[550px] gap-8 rounded-lg overflow-clip bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 p-4 border border-sky-500 shadow-sky-500 shadow-md">
                <Sidebar />
                <MessageContainer />
            </div>
        </div>
    );
};

export default HomePage;
