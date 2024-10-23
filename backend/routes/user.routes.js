import { Router } from "express";
import protectedRoute from "../middleware/auth.middleware.js";
import { getOfflineTime, getUser } from "../controller/user.controller.js";

const router = Router();

router.get("/", protectedRoute, getUser);
router.get("/getOfflineTime/:id", getOfflineTime);

export default router;
