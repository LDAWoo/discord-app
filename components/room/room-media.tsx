"use client";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useParticipantSocket } from "@/hooks/use-participant-socket";
import { Member, Participant, Profile } from "@prisma/client";
import RoomHeader from "./room-header";
import UserAvatar from "../global/user-avatar";
import { Button } from "../ui/button";
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";
import RoomItem from "./room-item";

interface RoomMediaProps {
    name: string;
    imageUrl: string;
    member: Member;
    channelId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramValue: string;
    paramKey: "channelId";
    type: "channel";
}

type ParticipantWithMemberWithProfile = Participant & {
    member: Member & {
        profile: Profile;
    };
};

const RoomMedia = ({ apiUrl, channelId, imageUrl, name, paramValue, paramKey, socketQuery, socketUrl }: RoomMediaProps) => {
    const router = useRouter();
    const queryKey = `participant:${channelId}`;
    const addKey = `participant:${channelId}:joined`;
    const updateKey = `participant:${channelId}:update`;

    const { data } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    });

    useParticipantSocket({
        queryKey,
        addKey,
        updateKey,
    });

    console.log(data);

    const handleJoin = async () => {
        try {
            const url = qs.stringifyUrl({
                url: socketUrl,
                query: socketQuery,
            });

            await axios.post(url);
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative group bg-white dark:bg-black w-full h-full">
            <RoomHeader name={name} />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2] h-[160px] absolute top-0 left-0 right-0 bg-gradient" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2] h-[160px] absolute bottom-0 left-0 right-0 bg-gradient" />
            <div className="absolute inset-[60px_0px_56px_8px] contain-layout">
                <div className="flex flex-wrap justify-center">
                    <div className="w-[528px] mb-[8px] flex items-center">
                        <div className="aspect-[16/9] w-full bg-secondary rounded-xl">
                            <div className="relative h-full w-full dark:bg-[#3c3d38] rounded-xl overflow-hidden">
                                <div className="flex h-full items-center justify-center">
                                    <UserAvatar src={imageUrl} className="object-cover h-[80px] w-[80px]" />
                                </div>
                                <div className="absolute left-2 bottom-2 bg-white dark:bg-zinc-900 rounded-lg p-[4px_12px] text-primary">
                                    <span className="text-sm">{name}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {data?.pages[0]?.items.map((participant: ParticipantWithMemberWithProfile) => (
                        <div key={participant.id}>
                            <RoomItem
                                participant={participant}
                                isLocalParticipant={false} // Compare participant ID with current user's ID
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-[24px]">
                    <Button onClick={handleJoin} className="px-2 rounded-full  w-[96px] bg-green-700 hover:bg-green-800 transition text-white font-normal text-sm">
                        Join Video
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RoomMedia;
