"use client";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useParticipantSocket } from "@/hooks/use-participant-socket";
import { useSocket } from "@/providers/socket-provider";
import { Member, Participant, Profile } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { Button } from "../ui/button";
import RoomHeader from "./room-header";
import RoomItem from "./room-item";
import { useMediaStream } from "@/hooks/use-media-stream";
import { useEffect, useState } from "react";
import { useFeer } from "@/hooks/use-feer";
import { usePlayer } from "@/hooks/use-player";
import RoomPlayer from "./room-player";
import { cloneDeep } from "lodash";

interface RoomMediaProps {
    name: string;
    serverId: string;
    channelId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramValue: string;
    paramKey: "channelId";
    type: "channel";
    member: Member;
}

type ParticipantWithMemberWithProfile = Participant & {
    member: Member & {
        profile: Profile;
    };
};

const RoomMedia = ({ apiUrl, name, member, channelId, serverId, paramValue, paramKey, socketQuery, socketUrl }: RoomMediaProps) => {
    const router = useRouter();
    const { socket } = useSocket();
    const { stream } = useMediaStream();
    const { myId, peer } = useFeer(channelId);
    const { players, setPlayers, playerHighlighted, nonHighlightedPlayers, toggleAudio, toggleVideo, leaveRoom } = usePlayer({
        myId,
        channelId,
        serverId,
        peer,
    });

    const { id } = member;
    const queryKey = `participant:${channelId}`;
    const addKey = `join-channel`;
    const updateKey = `participant:${channelId}:update`;

    useParticipantSocket({
        queryKey,
        addKey,
        updateKey,
    });

    const [users, setUsers] = useState([]);
    // const { data } = useChatQuery({
    //     queryKey,
    //     apiUrl,
    //     paramKey,
    //     paramValue,
    // });

    const handleJoin = async () => {
        try {
            const url = qs.stringifyUrl({
                url: socketUrl,
                query: socketQuery,
            });
            await axios.post(url);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!socket || !stream || !peer) return;

        const handleConnectedChannel = (memberId: string) => {
            console.log(`Received join-channel event for member ${memberId}`);

            const call = peer.call(memberId, stream);

            call.on("stream", (incomingStream) => {
                console.log(`incoming stream from ${memberId}`);
                setPlayers((prev) => ({
                    ...prev,
                    [memberId]: {
                        url: incomingStream,
                        muted: true,
                        playing: true,
                    },
                }));

                setUsers((prev) => ({
                    ...prev,
                    [memberId]: call,
                }));
            });
        };

        socket.on("member-connected", handleConnectedChannel);

        return () => {
            socket.off("member-connected", handleConnectedChannel);
        };
    }, [socket, peer, stream, myId]);

    useEffect(() => {
        if (!socket) return;

        const handleToggleAudio = (memberId: string) => {
            setPlayers((prev) => {
                const copy = cloneDeep(prev);
                copy[memberId].muted = !copy[memberId].muted;
                return {
                    ...copy,
                };
            });
        };

        const handleToggleVideo = (memberId: string) => {
            setPlayers((prev) => {
                const copy = cloneDeep(prev);
                copy[memberId].playing = !copy[memberId].playing;
                return {
                    ...copy,
                };
            });
        };

        const handleMemberLeave = (memberId: string) => {
            users[memberId]?.close();

            const playersCopy = cloneDeep(players);
            delete playersCopy[memberId];
            setPlayers(playersCopy);
        };

        socket.on("member-toggle-audio", handleToggleAudio);
        socket.on("member-toggle-video", handleToggleVideo);
        socket.on("member-leave", handleMemberLeave);

        return () => {
            socket.off("member-toggle-audio", handleToggleAudio);
            socket.off("member-toggle-video", handleToggleVideo);
            socket.off("member-leave", handleMemberLeave);
        };
    }, [players, socket, users]);

    useEffect(() => {
        if (!peer || !stream) return;
        peer.on("call", (call) => {
            const { peer: callerId } = call;
            call.answer(stream);

            call.on("stream", (incomingStream) => {
                console.log(`incoming stream from ${callerId}`);
                setPlayers((prev) => ({
                    ...prev,
                    [callerId]: {
                        url: incomingStream,
                        muted: true,
                        playing: true,
                    },
                }));
                setUsers((prev) => ({
                    ...prev,
                    [callerId]: call,
                }));
            });
        });
    }, [peer, stream]);

    useEffect(() => {
        if (!stream || !myId) return;
        console.log(`setting my stream ${myId}`);
        setPlayers((prev) => ({
            ...prev,
            [myId]: {
                url: stream,
                muted: true,
                playing: true,
            },
        }));
    }, [stream, myId]);

    console.log(players);

    return (
        <div className="relative group bg-white dark:bg-black w-full h-full overflow-hidden">
            <RoomHeader name={name} />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2] h-[160px] absolute top-0 left-0 right-0 bg-gradient" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2] h-[160px] absolute bottom-0 left-0 right-0 bg-gradient rotate-180" />
            <div className="absolute inset-[60px_0px_56px_8px] contain-layout overflow-y-auto">
                <div className="flex flex-wrap justify-center gap-2">
                    {Object.entries(nonHighlightedPlayers).map(([playerId, player]) => {
                        return <RoomItem key={playerId} name={playerId === myId ? "V" : "H"} stream={player.url} muted={player.muted} playing={player.playing} />;
                    })}
                </div>

                {playerHighlighted && (
                    <div className="flex flex-wrap justify-center gap-2">
                        <RoomItem name={"H"} stream={playerHighlighted.url} muted={playerHighlighted.muted} playing={playerHighlighted.playing} />
                    </div>
                )}
            </div>
            <RoomPlayer muted={playerHighlighted?.muted} playing={playerHighlighted?.playing} onToggleAudio={toggleAudio} onToggleVideo={toggleVideo} onLeave={leaveRoom} />
        </div>
    );
};

export default RoomMedia;
