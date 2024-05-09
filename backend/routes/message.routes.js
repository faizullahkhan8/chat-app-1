import { Router } from "express";

import { sendMessage, getMessages } from "../controller/message.controller.js";
import protectedRoute from "../middleware/auth.middleware.js";

const router = Router();

// Send Message route
router.post("/send/:id", protectedRoute, sendMessage);
router.get("/:id", protectedRoute, getMessages);

export default router;
