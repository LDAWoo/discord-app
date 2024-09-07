export const expireInviteDate = [
    { name: "30 minutes", value: "30m" },
    { name: "1 hour", value: "1h" },
    { name: "6 hours", value: "6h" },
    { name: "12 hours", value: "12h" },
    { name: "1 day", value: "1d" },
    { name: "7 days", value: "7d" },
    { name: "Never", value: "never" },
] as const;

export type Option = {
    name: string;
    value: string | number;
};

export const getExpirationDate = (value: string): Date | null => {
    const now = new Date();
    switch (value) {
        case "30m":
            return new Date(now.getTime() + 30 * 60000);
        case "1h":
            return new Date(now.getTime() + 60 * 60000);
        case "6h":
            return new Date(now.getTime() + 6 * 60 * 60000);
        case "12h":
            return new Date(now.getTime() + 12 * 60 * 60000);
        case "1d":
            return new Date(now.setDate(now.getDate() + 1));
        case "7d":
            return new Date(now.setDate(now.getDate() + 7));
        case "never":
            return null;
        default:
            return new Date(now.setDate(now.getDate() + 7)); // Default to 7 days
    }
};

export const limitedUserInvite = [
    { name: "No limit", value: 0 },
    { name: "1 user", value: 1 },
    { name: "5 users", value: 5 },
    { name: "10 users", value: 10 },
    { name: "25 users", value: 25 },
    { name: "50 users", value: 50 },
    { name: "100 users", value: 100 },
];

export const friendsOfUser = [
    {
        id: "1",
        name: "Hoang Tran 1",
        imageUrl: "",
    },
    {
        id: "2",
        name: "Hoang Tran 2",
        imageUrl: "",
    },
    {
        id: "3",
        name: "Hoang Tran 3",
        imageUrl: "",
    },
];
