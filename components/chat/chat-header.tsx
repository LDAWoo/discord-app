import React from "react";
import { ExclamationIcon } from "../icons";
import { MobileToggle } from "../global/mobile-toggle";
import UserAvatar from "../global/user-avatar";
import { SocketIndicator } from "../socket-indicator";

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}

const ChatHeader = ({ name, serverId, type, imageUrl }: ChatHeaderProps) => {
    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b">
            <MobileToggle serverId={serverId} />
            {type === "channel" && <ExclamationIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2" />}
            {type === "conversation" && <UserAvatar src={imageUrl} className="mr-2" />}
            <p className="font-medium text-md text-primary">{name}</p>
            <div className="ml-auto flex items-center ">
                <SocketIndicator />
            </div>
        </div>
    );
};

export default ChatHeader;
