import express from "express";
const router = express.Router();
import { handlePasskeyRegister, handlePasskeyLogin, handleMfaRegister, handleMfaLogin } from "../controllers/passkey.js";
import { checkAuth } from "../middleware/auth.js";


router.post("/passkeys/register", checkAuth, handlePasskeyRegister);
router.post("/passkeys/mfa/register", checkAuth, handleMfaRegister);
router.post("/passkeys/mfa/login", checkAuth, handleMfaLogin);
router.post("/passkeys/login", handlePasskeyLogin);

export default router;
