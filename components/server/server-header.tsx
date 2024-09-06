"use client";
import React from "react";

import { MemberRole, Server } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOutIcon, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server: Server;
    role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
    const { onOpen } = useModal();
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none !p-[0_16px]" asChild>
                <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto opacity-90" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs text-black dark:text-neutral-400 space-y-[2px]">
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() =>
                            onOpen("invite", {
                                server,
                            })
                        }
                        className="text-indigo-600 dark:text-indigo-400 hover:!text-white hover:!bg-indigo-600 transition-all duration-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Invite People <UserPlus className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}

                {isAdmin && (
                    <DropdownMenuItem className="hover:!text-white hover:!bg-indigo-600 transition-all duration-500 px-3 py-2 text-sm cursor-pointer">
                        Server Settings <Settings className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}

                {isAdmin && (
                    <DropdownMenuItem className="hover:!text-white hover:!bg-indigo-600 transition-all duration-500 px-3 py-2 text-sm cursor-pointer">
                        Manage Members <Users className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}

                {isModerator && (
                    <DropdownMenuItem className="hover:!text-white hover:!bg-indigo-600 transition-all duration-500 px-3 py-2 text-sm cursor-pointer">
                        Create Chanel <PlusCircle className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}

                {isModerator && <DropdownMenuSeparator />}

                {isAdmin && (
                    <DropdownMenuItem className="text-rose-500 hover:!text-white hover:!bg-rose-600 transition-all duration-500 px-3 py-2 text-sm cursor-pointer">
                        Delete Server <Trash className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}

                {!isAdmin && (
                    <DropdownMenuItem className="text-rose-500 hover:!text-white hover:!bg-rose-600 transition-all duration-500 px-3 py-2 text-sm cursor-pointer">
                        Leave Server <LogOutIcon className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ServerHeader;
