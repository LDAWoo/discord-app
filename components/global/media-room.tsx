import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
}
const MediaRoom = ({ audio, chatId, video }: MediaRoomProps) => {
    const { user } = useUser();

    useEffect(() => {
        if (!user?.firstName || !user?.lastName) return;

        const name = `${user?.firstName} ${user.lastName}`;
    }, []);

    return <div>MediaRoom</div>;
};

export default MediaRoom;
