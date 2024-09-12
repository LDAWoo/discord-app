import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessage from "@/components/chat/chat-message";
import RoomMedia from "@/components/room/room-media";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/login");
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        },
    });

    const member = await db.member.findFirst({
        where: {
            serverId: params?.serverId,
            profileId: profile.id,
        },
    });

    if (!channel || !member) {
        return redirect(`/`);
    }

    return (
        <div className="bg-accent flex flex-col h-full">
            {channel.type === "AUDIO" ||
                (channel.type === "VIDEO" && (
                    <>
                        <RoomMedia
                            type="channel"
                            name={channel.name}
                            member={member}
                            channelId={channel.id}
                            serverId={channel.serverId}
                            apiUrl="/api/participant"
                            socketUrl="/api/socket/participant"
                            socketQuery={{
                                channelId: channel.id,
                                serverId: channel.serverId,
                            }}
                            paramValue={channel.id}
                            paramKey="channelId"
                        />
                    </>
                ))}
            {channel.type !== "AUDIO" && channel.type !== "VIDEO" && (
                <>
                    <ChatHeader name={channel.name} serverId={channel.serverId} type="channel" />
                    <ChatMessage
                        chatId={channel.id}
                        member={member}
                        name={channel.name}
                        type="channel"
                        apiUrl={"/api/messages"}
                        socketUrl="/api/socket/messages"
                        socketQuery={{
                            channelId: channel.id,
                            serverId: channel.serverId,
                        }}
                        paramValue={channel.id}
                        paramKey="channelId"
                    />
                    <ChatInput
                        name={channel.name}
                        type="channel"
                        apiUrl="/api/socket/messages"
                        query={{
                            channelId: channel.id,
                            serverId: channel.serverId,
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default ChannelIdPage;
