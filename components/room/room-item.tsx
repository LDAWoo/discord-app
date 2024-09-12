"use client";
import { useEffect, useRef } from "react";
import UserAvatar from "../global/user-avatar";
import { DiscordIcon, MutedIcon } from "../icons";
import { cn } from "@/lib/utils";

interface RoomItemProps {
    name: string;
    imageUrl: string;
    stream: MediaStream | null;
    muted: boolean;
    playing: boolean;
}

const backgroundMap: { [key: string]: string } = {
    A: "bg-red-500",
    B: "bg-blue-500",
    C: "bg-green-500",
    D: "bg-yellow-500",
    E: "bg-purple-500",
    F: "bg-pink-500",
    G: "bg-indigo-500",
    H: "bg-orange-500",
    I: "bg-teal-500",
    J: "bg-cyan-500",
    V: "bg-[#3c3d38] ",
};

const getBackgroundColor = (name: string): string => {
    const firstLetter = name.charAt(0).toUpperCase();
    return backgroundMap[firstLetter] || "bg-gray-500"; // Default to gray if no match
};

const RoomItem = ({ name, imageUrl, stream, muted, playing }: RoomItemProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="w-[520px] mb-[8px] flex items-center">
            <div className="aspect-[16/9] w-full bg-secondary rounded-xl">
                <div className={cn("relative h-full w-full rounded-xl overflow-hidden")}>
                    {stream && playing ? (
                        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover overflow-hidden" />
                    ) : (
                        <>
                            <div className={cn("flex h-full w-full items-center justify-center", getBackgroundColor(name))}>
                                {imageUrl ? (
                                    <UserAvatar src={imageUrl} className="object-cover h-[80px] w-[80px]" />
                                ) : (
                                    <>
                                        <DiscordIcon className="h-[40px] w-[40px]" />
                                    </>
                                )}
                            </div>
                        </>
                    )}

                    <div className="absolute left-2 right-2 bottom-2 mt-2 flex space-x-2">
                        <div className="text-sm flex-1 flex">
                            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-[6px_12px] rounded-[8px] bg-white/80 dark:bg-black/80">{name}</span>
                        </div>

                        {muted && (
                            <div className="p-2 rounded-full bg-white dark:bg-zinc-900">
                                <MutedIcon size={18} className="text-white" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomItem;
