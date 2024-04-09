/* eslint-disable react/prop-types */
import { useState } from "react";
import EditGroupModal from "./EditGroupModal";
import ModalPortal from "../../shared/components/modal-portal/ModalPortal";

function EditGroupChatModal({ fetchMessages, fetchAgain, setFetchAgain }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button
                className=" rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                onClick={() => setModalOpen(true)}
            >
                Edit Group
            </button>
            <ModalPortal open={modalOpen}>
                <EditGroupModal
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

export default EditGroupChatModal;
