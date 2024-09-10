"use client";
import { useSocket } from "@/providers/socket-provider";
import { useState, useEffect, useRef } from "react";

export const useWebRTC = (participantId: string) => {
    const { socket } = useSocket();
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStreams, setRemoteStreams] = useState<Record<string, MediaStream>>({});
    const peerConnections = useRef<Record<string, RTCPeerConnection>>({});

    // Create peer connection and handle ICE events
    const createPeerConnection = (remoteParticipantId: string) => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // Add more STUN/TURN servers for robustness
        });

        // Send ICE candidates to the signaling server
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket?.emit("ice-candidate", { participantId: remoteParticipantId, candidate: event.candidate });
            }
        };

        // When receiving remote streams, store them
        pc.ontrack = (event) => {
            setRemoteStreams((prev) => ({
                ...prev,
                [remoteParticipantId]: event.streams[0], // Use the first stream
            }));
        };

        // Add local stream tracks to the connection
        if (localStream) {
            localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
        }

        peerConnections.current[remoteParticipantId] = pc;
        return pc;
    };

    // Send WebRTC Offer
    const sendOffer = async (remoteParticipantId: string) => {
        const pc = peerConnections.current[remoteParticipantId] || createPeerConnection(remoteParticipantId);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket?.emit("offer", { participantId: remoteParticipantId, sdp: offer });
    };

    // Handle incoming WebRTC Offer
    const handleOffer = async (remoteParticipantId: string, offer: RTCSessionDescriptionInit) => {
        const pc = peerConnections.current[remoteParticipantId] || createPeerConnection(remoteParticipantId);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket?.emit("answer", { participantId: remoteParticipantId, sdp: answer });
    };

    // Handle incoming Answer
    const handleAnswer = async (remoteParticipantId: string, answer: RTCSessionDescriptionInit) => {
        const pc = peerConnections.current[remoteParticipantId];
        if (pc) {
            await pc.setRemoteDescription(new RTCSessionDescription(answer));
        }
    };

    // Handle ICE candidates
    const handleICECandidate = (remoteParticipantId: string, candidate: RTCIceCandidateInit) => {
        const pc = peerConnections.current[remoteParticipantId];
        if (pc) {
            pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
    };

    // Setup media stream and WebSocket event listeners
    useEffect(() => {
        const init = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);
            } catch (error) {
                console.error("Error accessing media devices:", error);
            }
        };

        init();

        // WebSocket event listeners for signaling
        socket?.on("offer", ({ participantId, sdp }) => handleOffer(participantId, sdp));
        socket?.on("answer", ({ participantId, sdp }) => handleAnswer(participantId, sdp));
        socket?.on("ice-candidate", ({ participantId, candidate }) => handleICECandidate(participantId, candidate));

        return () => {
            // Cleanup WebSocket listeners
            socket?.off("offer");
            socket?.off("answer");
            socket?.off("ice-candidate");
        };
    }, [localStream, socket]);

    return { localStream, remoteStreams, sendOffer };
};
