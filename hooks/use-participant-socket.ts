"use client";

import { useSocket } from "@/providers/socket-provider";
import { Participant, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ParticipantSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
};

export const useParticipantSocket = ({ addKey, updateKey, queryKey }: ParticipantSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    console.log("render ...");

    useEffect(() => {
        if (!socket) {
            return;
        }

        // Xử lý sự kiện join-channel
        socket.on(addKey, (data: { channelId: string; memberId: string }) => {
            console.log(`a new member ${data.memberId} joined channel ${data.channelId}`);
            // Không cần emit "member-connected" ở đây, server sẽ xử lý việc đó
        });

        // Cleanup function
        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        };
    }, [queryClient, socket, addKey, updateKey, queryKey]);
};
