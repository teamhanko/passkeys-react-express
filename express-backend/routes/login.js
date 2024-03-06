import express from "express";
const router = express.Router();
import { handleUserLogin, handleUserLogout } from "../controllers/user.js";

router.post("/login", handleUserLogin);
router.post("/logout", handleUserLogout);

export default router;
