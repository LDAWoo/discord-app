"use client";
import { useWebRTC } from "@/hooks/use-web-rtc";
import { Participant } from "@prisma/client";
import { useRef } from "react";

interface RoomItemProps {
    participant: Participant;
    isLocalParticipant: boolean;
}

const RoomItem = ({ participant, isLocalParticipant }: RoomItemProps) => {
    const { localStream, remoteStreams } = useWebRTC(participant.id);
    const localVideoRef = useRef<HTMLVideoElement>(null);

    // Display local stream
    if (localStream && localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
    }

    return (
        <div className="w-[528px] mb-[8px] flex items-center">
            <div className="aspect-[16/9] w-full bg-secondary rounded-xl">
                <div className="relative h-full w-full dark:bg-[#3c3d38] rounded-xl overflow-hidden">
                    {isLocalParticipant ? (
                        <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover overflow-hidden" />
                    ) : remoteStreams[participant.id] ? (
                        <video
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover overflow-hidden"
                            ref={(el) => {
                                if (el) el.srcObject = remoteStreams[participant.id];
                            }}
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">Image{/* <UserAvatar src={participant.imageUrl} className="object-cover h-[80px] w-[80px]" /> */}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomItem;
