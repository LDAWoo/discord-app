"use client";

import CreateServerModal from "@/components/modals/create-server-modal";
import InviteModal from "@/components/modals/invite-modal";
import { useMounted } from "@/hooks/use-mounted";

export const ModalProvider = () => {
    const mounted = useMounted();

    if (!mounted) return null;

    return (
        <>
            <CreateServerModal />
            <InviteModal />
        </>
    );
};
