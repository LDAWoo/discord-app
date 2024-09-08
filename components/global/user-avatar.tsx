import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { DiscordIcon } from "../icons";

interface UserAvatarProps {
    src?: string;
    alt?: string;
    className?: string;
}

const UserAvatar = ({ className, src, alt }: UserAvatarProps) => {
    return (
        <Avatar className={cn("h-8 w-8", className)}>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>
                <div className="w-8 h-8 items-center flex justify-center rounded-full bg-indigo-500">
                    <DiscordIcon size={18} />
                </div>
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;
