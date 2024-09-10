import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Participant } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const profile = currentProfile();

        const { searchParams } = new URL(req.url);

        const cursor = searchParams.get("cursor");
        const channelId = searchParams.get("channelId");

        if (!profile) {
            return new NextResponse("Unauthorized", {
                status: 401,
            });
        }

        if (!channelId) {
            return new NextResponse("Channel ID missing", {
                status: 400,
            });
        }

        let participants: Participant[] = [];

        if (cursor) {
            participants = await db.participant.findMany({
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        },
                    },
                },
                orderBy: {
                    joinedAt: "desc",
                },
            });
        } else {
            participants = await db.participant.findMany({
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        },
                    },
                },
                orderBy: {
                    joinedAt: "desc",
                },
            });
        }

        let nextCursor = null;

        if (participants.length === 100) {
            nextCursor = participants[100 - 1].id;
        }

        return NextResponse.json({
            items: participants,
            nextCursor,
        });
    } catch (error) {
        console.log("[MESSAGES_GET]", error);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}
