"use client";
import { useSocket } from "@/providers/socket-provider";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

export const useFeer = (channelId: string) => {
    const { socket } = useSocket();
    const [myId, setMyId] = useState("");
    const peerRef = useRef<Peer | null>(null);

    useEffect(() => {
        if (!channelId || !socket) return;

        async function initPeer() {
            if (!peerRef.current) {
                const myPeer = new (await import("peerjs")).default();
                peerRef.current = myPeer;

                myPeer.on("open", (id) => {
                    console.log(`Your peer ID is ${id}`);
                    setMyId(id);
                    socket?.emit("join-channel", { channelId, memberId: id });
                });
            }
        }

        initPeer();

        return () => {
            if (peerRef.current) {
                console.log("Destroying peer connection");
                peerRef.current.destroy();
                peerRef.current = null;
                setMyId("");
            }
        };
    }, [channelId, socket]);

    return {
        peer: peerRef.current,
        myId,
    };
};
