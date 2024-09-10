"use client";
import { CopyIcon, PencilIcon } from "@/components/icons";
import ActionTooltip from "@/components/ui/action-tooltip";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Ellipsis, Trash2Icon } from "lucide-react";
import { useState } from "react";

interface MessageActionProps {
    canEditMessage: boolean;
    canDeletedMessage: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

const MessageAction = ({ canDeletedMessage, canEditMessage, onEdit, onDelete }: MessageActionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cn("items-center absolute flex -top-3 right-5 bg-accent border border-primary-foreground/50 rounded-none", isOpen ? "!opacity-100 visible" : "invisible opacity-0 group-hover:visible group-hover:opacity-100")}>
            {canEditMessage && (
                <ActionTooltip label="Edit" sideOffset={10} className="font-normal">
                    <Button onClick={onEdit} className="rounded-none h-8 w-8 p-1 text-zinc-500 dark:text-zinc-400 hover:bg-primary/10" variant={"ghost"}>
                        <PencilIcon size={18} />
                    </Button>
                </ActionTooltip>
            )}
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger className="flex items-center justify-center p-1 h-8 w-8 hover:bg-primary/10 data-[state=open]:bg-primary/10 text-zinc-500 dark:text-zinc-400">
                    <ActionTooltip label="More" sideOffset={10} className="font-normal">
                        <Ellipsis size={20} />
                    </ActionTooltip>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-[6px_8px] w-[188px] space-y-[2px] rounded-[4px]" side="left" sideOffset={10}>
                    {canEditMessage && (
                        <DropdownMenuItem onClick={onEdit} className="rounded-[4px] text-primary/80 hover:!text-white hover:!bg-indigo-600 transition px-[8px] py-[6px] text-sm cursor-pointer">
                            Edit Message <PencilIcon className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={onEdit} className="rounded-[4px] text-primary/80 hover:!text-white hover:!bg-indigo-600 transition px-[8px] py-[6px] text-sm cursor-pointer">
                        Copy Text <CopyIcon className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                    {canDeletedMessage && (
                        <DropdownMenuItem onClick={onDelete} className="rounded-[4px] text-rose-600 hover:!text-white hover:!bg-rose-800 transition px-[8px] py-[6px] text-sm cursor-pointer">
                            Delete Message <Trash2Icon className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default MessageAction;
