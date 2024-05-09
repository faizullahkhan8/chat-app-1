import { Router } from "express";
import protectedRoute from "../middleware/auth.middleware.js";
import { getUser } from "../controller/user.controller.js";

const router = Router();

router.get("/", protectedRoute, getUser);

export default router;
