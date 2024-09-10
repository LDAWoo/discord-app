import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import ServerHeader from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import ServerMember from "./server-member";

interface ServerSidebarProps {
    serverId: string;
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                },
            },
        },
    });

    if (!server) {
        return redirect("/");
    }

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);
    const members = server?.members.filter((member) => member.profileId !== profile.id);

    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col h-full w-full bg-background text-foreground">
            <ServerHeader server={server} role={role} />
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">{/* <ServerBrowse /> */}</div>

                <Separator className="rounded-[3px] my-2" />

                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerSection sectionType="channels" channelType={ChannelType.TEXT} role={role} label="Text channels" />
                        {textChannels.map((channel) => (
                            <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
                        ))}
                    </div>
                )}

                {!!audioChannels?.length && (
                    <div className="mb-2">
                        <ServerSection sectionType="channels" channelType={ChannelType.AUDIO} role={role} label="Voice channels" />
                        {audioChannels.map((channel) => (
                            <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
                        ))}
                    </div>
                )}

                {!!videoChannels?.length && (
                    <div className="mb-2">
                        <ServerSection sectionType="channels" channelType={ChannelType.VIDEO} role={role} label="Video channels" />
                        {videoChannels.map((channel) => (
                            <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
                        ))}
                    </div>
                )}

                {!!members?.length && (
                    <div className="mb-2">
                        <ServerSection sectionType="members" role={role} label="Members" server={server} />
                        {members.map((member) => (
                            <ServerMember key={member.id} server={server} member={member} />
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};

export default ServerSidebar;
