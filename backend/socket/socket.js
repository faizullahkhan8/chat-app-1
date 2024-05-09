import { Server } from "socket.io";
import http from "http";

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

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        console.log("disconnected");
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, server, io };
