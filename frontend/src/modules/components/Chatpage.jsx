import { useState } from "react";
import Chatbox from "./Chatbox";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../../shared/components/resizable/resizable";
import SideDrawer from "./SideDrawer";
import Header from "./Header";

const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <>
            <ResizablePanelGroup
                direction="horizontal"
                className="!h-[100vh] max-w-full rounded-lg border "
            >
                <ResizablePanel
                    defaultSize={25}
                    minSize={20}
                    maxSize={35}
                    className=" border-r-2"
                >
                    <SideDrawer />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75}>
                    <Header />
                    <main className="chatbox">
                        <div className="!flex  w-full p-[10px] h-full">
                            <Chatbox
                                fetchAgain={fetchAgain}
                                setFetchAgain={setFetchAgain}
                            />
                        </div>
                    </main>
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
};

export default Chatpage;
