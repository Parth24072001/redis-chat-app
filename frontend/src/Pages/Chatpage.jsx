import { useState } from "react";
import Chatbox from "../components/Chatbox";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import Header from "../components/miscellaneous/Header";

const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <div className=" flex ">
                <div className=" fixed inset-y-0 z-50 flex w-[400px] flex-col ">
                    <SideDrawer
                        setSidebarOpen={setSidebarOpen}
                        sidebarOpen={sidebarOpen}
                        fetchAgain={fetchAgain}
                    />
                </div>
                <div className="pl-[400px] w-full   ">
                    <div className=" border-l border-black">
                        <Header />
                        <main className="chatbox">
                            <div className="!flex  w-full p-[10px] h-full">
                                <Chatbox
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatpage;
