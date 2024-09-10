import React from "react";
import { AudioIcon } from "../icons";
interface RoomHeaderProps {
    name: string;
}

const RoomHeader = ({ name }: RoomHeaderProps) => {
    return (
        <div className="absolute top-0 left-0 right-0 z-[3] -translate-y-full group-hover:translate-y-0 transition duration-300 h-[48px] w-full">
            <div className="flex items-center p-2 w-full text-primary/80">
                <AudioIcon className="w-6 h-6 m-[0px_8px]" />
                <span className="font-semibold text-[15px]">{name}</span>
            </div>
        </div>
    );
};

export default RoomHeader;
