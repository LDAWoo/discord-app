import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIo } from "@/types";

export const config = {
    api: {
        bodyParser: false,
    },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        console.log("Initializing Socket.IO server");
        const path = "/api/socket/io";
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false,
        });
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            console.log("New socket connection:", socket.id);

            socket.on("join-channel", (data: { channelId: string; memberId: string }) => {
                console.log(`a new member ${data.memberId} joined channel ${data.channelId}`);
                socket.join(data.channelId);
                socket.broadcast.to(data.channelId).emit("member-connected", data.memberId);
            });

            socket.on("member-toggle-audio", (memberId, channelId) => {
                socket.join(channelId);
                socket.broadcast.to(channelId).emit("member-toggle-audio", memberId);
            });

            socket.on("member-toggle-video", (memberId, channelId) => {
                socket.join(channelId);
                socket.broadcast.to(channelId).emit("member-toggle-video", memberId);
            });

            socket.on("member-leave", (memberId, channelId) => {
                socket.join(channelId);
                socket.broadcast.to(channelId).emit("member-leave", memberId);
            });
        });
    } else {
        console.log("Socket.IO server already initialized");
    }

    res.end();
};

export default ioHandler;
