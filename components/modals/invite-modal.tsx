"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

const InviteModal = () => {
    const { isOpen, type } = useModal();

    const isModalOpen = isOpen && type === "invite";

    return (
        <Dialog open={isModalOpen}>
            <DialogContent className="bg-background shadow-[0_2px_10px_0_hsl(0_calc(1_*_0%)_0%_/_0.2)] p-0 overflow-hidden border-0 !rounded-[5px]">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-medium capitalize">Customize your server</DialogTitle>
                    <DialogDescription className="text-muted-foreground">GIve your server a personality with a name and an image. You can always change it later.</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default InviteModal;
