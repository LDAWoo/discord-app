import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "./db";

export const initialProfile = async () => {
    const user = await currentUser();

    if (!user) {
        return auth().redirectToSignIn();
    }

    let profile = await db.profile.findUnique({
        where: {
            userId: user.id,
        },
    });

    if (!profile) {
        try {
            profile = await db.profile.create({
                data: {
                    userId: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    imageUrl: user.imageUrl,
                    email: user.emailAddresses[0].emailAddress,
                },
            });
        } catch (error) {
            // If creation fails due to a race condition, try to fetch the profile again
            profile = await db.profile.findUnique({
                where: {
                    userId: user.id,
                },
            });
        }
    }

    if (!profile) {
        throw new Error("Failed to create or retrieve profile");
    }

    return profile;
};
