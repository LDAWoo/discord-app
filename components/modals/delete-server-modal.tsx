"use client";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
const DeleteServerModal = () => {
    const router = useRouter();
    const { isOpen, type, data, onClose } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const isModalOpen = isOpen && type === "deleteServer";
    const { server } = data;

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/servers/${server?.id}`);
            onClose();
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent showX={false} className="w-[440px] bg-background shadow-[0_2px_10px_0_hsl(0_calc(1_*_0%)_0%_/_0.2)] p-0 overflow-hidden border-0 !rounded-[5px]">
                <DialogHeader className="pt-4 px-4">
                    <DialogTitle className="text-base text-left font-semibold mr-[32px]">{`Delete server '${server?.name}'`}</DialogTitle>
                    <DialogDescription className="text-left text-muted-foreground">
                        Are you sure you want to delete <span className="text-primary/80 font-semibold">{server?.name}</span>? Will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="bg-primary-foreground/30 p-4 mt-4">
                    <div className="flex h-full items-end">
                        <Button disabled={isLoading} className="ml-auto font-normal" size={"sm"} variant={"link"} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button disabled={isLoading} className="ml-2 rounded-[2px] font-normal bg-rose-600 hover:bg-rose-800 text-white" size={"sm"} onClick={onDelete}>
                            Delete Server
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteServerModal;
