import { useEffect, useState, useRef } from "react";

// const servers = {
//     iceServers: [{ urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] }],
//     iceCandidatePoolSize: 10,
// };

export const useMediaStream = () => {
    const [state, setState] = useState<MediaStream | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        async function initStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                console.log("Setting your stream");
                setState(stream);
                streamRef.current = stream;
            } catch (error) {
                console.error("Error in media navigator", error);
            }
        }

        if (!streamRef.current) {
            initStream();
        }

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return {
        stream: state,
    };
};
