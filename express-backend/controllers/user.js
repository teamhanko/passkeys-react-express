import { v4 as uuidv4 } from "uuid";

import { setUser, clearUserSession, setUserTempSession } from "../service/auth.js";
import db from "../db.js";

// async function handleUserLogin(req, res) {
//   const { email, password } = req.body;
//   const user = db.users.find((user) => user.email === email);
//   if (!user || user.password !== password) {
//     return res.status(401).json({ message: "Invalid username or password" });
//   }
//   const sessionId = uuidv4();
//   setUser(sessionId, user);
//   console.log(sessionId);
//   res.cookie("sessionId", sessionId);
//   return res.status(200).json({ message: "Login successful" });
// }


async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = db.users.find((user) => user.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  if (user.mfaEnabled) {
    const tempSessionId = uuidv4();
    setUserTempSession(tempSessionId, user); 
    console.log("User authenticated with username+password, but still requires MFA to log in:", user.email);
    res.cookie("tempSessionId", tempSessionId, { httpOnly: true });
    return res.status(200).json({ message: "MFA required", mfaRequired: true });
  } else {
    // No MFA, proceed as usual
    const sessionId = uuidv4();
    setUser(sessionId, user);
    console.log(sessionId);
    res.cookie("sessionId", sessionId, { httpOnly: true });
    return res.status(200).json({ message: "Login successful" });
  }
}

async function handleUserLogout(req, res) {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    return res.status(400).json({ message: "No session to log out from" });
  }

  clearUserSession(sessionId);

  res.clearCookie("sessionId");
  return res.status(200).json({ message: "Logout successful" });
}

export { handleUserLogin, handleUserLogout };
