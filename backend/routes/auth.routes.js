import { Router } from "express";
import { Login, Register, Logout } from "../controller/auth.controller.js";
import protectedRoute from "../middleware/auth.middleware.js";

const router = Router();
// [ REGISTER  ]
router.post("/register", Register);

// [ LOGIN  ]
router.post("/login", Login);

// [ LOGOUT  ]
router.post("/logout", protectedRoute, Logout);

export default router;
