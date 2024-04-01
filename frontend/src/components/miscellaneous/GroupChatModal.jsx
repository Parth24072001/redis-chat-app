import { useState } from "react";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import ModalPortal from "../../shared/ModalPortal";

function GroupChatModal() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button
                className=" rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                onClick={() => setModalOpen(true)}
            >
                GroupChatModal
            </button>
            <ModalPortal open={modalOpen}>
                <UpdateGroupChatModal
                    setOpenModel={setModalOpen}
                    openModel={modalOpen}
                />
            </ModalPortal>
        </>
    );
}

export default GroupChatModal;
