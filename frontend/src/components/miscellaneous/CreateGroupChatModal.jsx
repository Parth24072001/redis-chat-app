/* eslint-disable react/prop-types */
import { useState } from "react";
import ModalPortal from "../../shared/ModalPortal";
import CreateGroupModal from "./CreateGroupModal";

function CreateGroupChatModal({ fetchMessages, fetchAgain, setFetchAgain }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button
                className=" rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                onClick={() => setModalOpen(true)}
            >
                Create Group
            </button>
            <ModalPortal open={modalOpen}>
                <CreateGroupModal
                    setOpenModel={setModalOpen}
                    openModel={modalOpen}
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                />
            </ModalPortal>
        </>
    );
}

export default CreateGroupChatModal;
