import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed",
        });
    }

    try {
        const profile = await currentProfilePages(req);
        const { serverId, channelId } = req.query;

        if (!profile) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!serverId) {
            return res.status(400).json({ error: "Server ID missing" });
        }

        if (!channelId) {
            return res.status(400).json({ error: "Channel ID missing" });
        }

        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile.id,
                    },
                },
            },
            include: {
                members: true,
            },
        });

        if (!server) {
            return res.status(404).json({ error: "Server not found" });
        }

        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string,
            },
        });

        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        const member = server.members.find((member) => member.profileId === profile.id);

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        const participant = await db.participant.create({
            data: {
                memberId: member.id,
                channelId: channelId as string,
                status: true,
            },
            include: {
                member: {
                    include: {
                        profile: true,
                    },
                },
            },
        });

        res?.socket?.server?.io?.emit("join-channel", {
            channelId: participant.channelId,
            memberId: participant.memberId,
        });

        return res.status(200).json(participant);
    } catch (error) {
        console.log("[PARTICIPANT_POST]", error);
        return res.status(500).json({
            message: "Internal Error",
        });
    }
}
