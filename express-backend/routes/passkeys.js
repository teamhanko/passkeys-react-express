import express from "express";
const router = express.Router();
import { handlePasskeyRegister, handlePasskeyLogin } from "../controllers/passkey.js";
import { checkAuth } from "../middleware/auth.js";


router.post("/passkeys/register", checkAuth, handlePasskeyRegister);
router.post("/passkeys/login", handlePasskeyLogin);

export default router;
