import { Server } from "socket.io";
import http from "http";

import lastOfflineModel from "../models/lastOffline.model.js";

import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["POST", ["GET"]],
    },
});

let userSocketMap = [];

export const getReciverSocketId = (reciverId) => {
    return userSocketMap[reciverId];
};

io.on("connection", async (socket) => {
    const userId = socket.handshake.query.userId;

    const userLastOffline = await lastOfflineModel.findOne({ userId });

    if (userLastOffline) {
        userLastOffline.status = "online";
        userLastOffline.offlineAt = null;
        await userLastOffline.save();
    } else {
        await lastOfflineModel.create({
            userId,
            status: "online",
            offlineAt: null,
        });
    }

    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", async () => {
        const lastOffline = await lastOfflineModel.findOneAndUpdate(
            { userId },
            { status: "offline", offlineAt: Date.now() }
        );

        delete userSocketMap[userId];
        console.log("disconnected");
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, server, io };
