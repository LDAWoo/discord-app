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

type ParticipantWithMemberWithProfile = Participant & {
    profile: Profile;
};

export const useParticipantSocket = ({ addKey, updateKey, queryKey }: ParticipantSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) {
            return;
        }

        // Xử lý sự kiện cập nhật participant
        socket.on(updateKey, (participant: ParticipantWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return oldData;
                }

                const newData = oldData.pages.map((page: any) => ({
                    ...page,
                    items: page.items.map((item: ParticipantWithMemberWithProfile) => (item.id === participant.id ? participant : item)),
                }));

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });

        // Xử lý sự kiện thêm participant mới
        socket.on(addKey, (participant: ParticipantWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [{ items: [participant] }],
                    };
                }

                const newData = [...oldData.pages];
                newData[0] = {
                    ...newData[0],
                    items: [participant, ...newData[0].items],
                };

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });

        // Cleanup function
        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        };
    }, [queryClient, socket, addKey, updateKey, queryKey]);
};
