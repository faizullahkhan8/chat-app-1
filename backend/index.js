import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { PORT } from "./config/env.config.js";
import connectToDB from "./database/connect.db.js";

// ROUTES :
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";

// FOR SEND AND RECIVE JSON
app.use(express.json({ limit: "50mb" }));

// FOR GET COOKEIS FORM THE REQUEST
app.use(cookieParser());

// CROSS ORGIN HANDLER
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["POST", "GET", "DELETE", "PUT"],
        credentials: true,
    })
);

// [ ROUTES MIDDLEWARE ]
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);
app.use("/backend/storage", express.static("backend/storage"));

// START UP THE SERVER ON PORT
server.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`);
    // RUN THE DB_CONNECTION FUNTION
    connectToDB();
});
