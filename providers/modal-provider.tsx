"use client";

import CreateChannelModal from "@/components/modals/create-channel-modal";
import CreateServerModal from "@/components/modals/create-server-modal";
import DeleteServerModal from "@/components/modals/delete-server-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
import InviteModal from "@/components/modals/invite-modal";
import LeaveServerModal from "@/components/modals/leave-server-modal";
import MembersModal from "@/components/modals/members-modal";
import { useMounted } from "@/hooks/use-mounted";

export const ModalProvider = () => {
    const mounted = useMounted();

    if (!mounted) return null;

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal />
            <MembersModal />
            <CreateChannelModal />
            <LeaveServerModal />
            <DeleteServerModal />
        </>
    );
};
