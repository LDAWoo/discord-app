"use client";
import { useModal } from "@/hooks/use-modal-store";
import { formatMessageDate } from "@/lib/date";
import axios from "axios";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import qs from "query-string";
import { useState } from "react";
import UserAvatar from "../global/user-avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
const DeleteMessageModal = () => {
    const { isOpen, type, data, onClose } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const { apiUrl, query, member, message } = data;
    const isModalOpen = isOpen && data && type === "deleteMessage";

    const fileType = message?.fileUrl?.split(".").pop();
    const isPDF = fileType === "pdf" && message?.fileUrl;
    const isImage = !isPDF && message?.fileUrl;

    const onDelete = async () => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            });
            setIsLoading(true);
            await axios.delete(url);
            onClose();
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
                    <DialogTitle className="text-base text-left font-semibold mr-[32px]">{`Delete Message`}</DialogTitle>
                    <DialogDescription className="text-left text-muted-foreground">Are you sure you want to delete this message?</DialogDescription>
                </DialogHeader>

                <div className="px-4">
                    <div className="border border-primary-foreground/90 px-4 bg-background shadow-lg rounded-[3px] py-[10px] flex">
                        <UserAvatar src={member?.profile?.imageUrl} className="h-10 w-10" />
                        <div className="flex flex-col ml-4 w-full">
                            <div className="flex flex-col">
                                <div className="inline-block">
                                    <span className="mr-1 text-sm font-semibold">{member?.profile?.name}</span>
                                    <span className="text-muted-foreground text-xs">{formatMessageDate(new Date(message?.createdAt || new Date()))}</span>
                                </div>
                            </div>

                            {!message?.fileUrl && <p className={"text-sm text-zinc-600 dark:text-zinc-300"}>{message?.content}</p>}

                            {isPDF && (
                                <div className="max-w-full w-full p-4 mt-2 rounded-[8px] border border-primary-foreground/90 bg-popover/10">
                                    <div className="relative flex items-center">
                                        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                                        <a href={message?.fileUrl || ""} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
                                            PDF File
                                        </a>
                                    </div>
                                </div>
                            )}

                            {isImage && (
                                <a href={message?.fileUrl || ""} target="_blank" rel="noopener noreferrer" className="relative aspect-square rounded-[8px] mt-1 overflow-hidden border flex items-center bg-secondary h-48 w-full">
                                    <Image fill src={message?.fileUrl || ""} alt={message.content} className="object-cover" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-4 flex flex-col">
                    <span className="text-green-400 uppercase font-bold text-sm">Protip:</span>
                    <span className="text-muted-foreground text-sm inline">
                        You can hold down shift when clicking <span className="font-semibold">delete message </span>
                        to bypass this confirmation entirely.
                    </span>
                </div>

                <DialogFooter className="bg-primary-foreground/30 p-4 mt-4">
                    <div className="flex h-full items-end">
                        <Button disabled={isLoading} className="ml-auto font-normal" size={"sm"} variant={"link"} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button disabled={isLoading} className="ml-2 rounded-[2px] font-normal bg-rose-600 hover:bg-rose-800 text-white" size={"sm"} onClick={onDelete}>
                            Delete
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteMessageModal;
