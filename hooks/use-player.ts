"use client";
import { useSocket } from "@/providers/socket-provider";
import { cloneDeep } from "lodash";
import { useRouter } from "next/navigation";
import Peer from "peerjs";
import { useState } from "react";

interface PlayersProps {
    myId: string; // Changed from LoDashExplicitNumberArrayWrapper to string
    channelId: string;
    serverId: string;
    peer: Peer;
}

interface Player {
    muted: boolean;
    playing: boolean;
    url: MediaStream;
    // Add other player properties as needed
}

export const usePlayer = ({ myId, channelId, serverId, peer }: PlayersProps) => {
    const { socket } = useSocket();
    const [players, setPlayers] = useState<Record<string, Player>>({});
    const router = useRouter();

    const playersCopy = cloneDeep(players);

    const playerHighlighted = playersCopy[myId];
    delete playersCopy[myId];

    const nonHighlightedPlayers = playersCopy;

    const leaveRoom = () => {
        socket?.emit("member-leave", myId, channelId);
        peer?.disconnect();
        router.push(`/servers/${serverId}`);
    };

    const toggleAudio = () => {
        setPlayers((prev) => {
            const copy = cloneDeep(prev);
            copy[myId].muted = !copy[myId].muted;
            return { ...copy };
        });
        socket?.emit("member-toggle-audio", myId, channelId);
    };

    const toggleVideo = () => {
        setPlayers((prev) => {
            const copy = cloneDeep(prev);
            copy[myId].playing = !copy[myId].playing;
            return { ...copy };
        });
        socket?.emit("member-toggle-video", myId, channelId);
    };

    return { players, setPlayers, playerHighlighted, nonHighlightedPlayers, toggleAudio, toggleVideo, leaveRoom };
};
