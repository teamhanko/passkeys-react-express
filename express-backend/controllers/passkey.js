import {
  startServerPasskeyRegistration,
  finishServerPasskeyRegistration,
  startServerPasskeyLogin,
  finishServerPasskeyLogin,
  startMfaRegistration,
  finishMfaRegistration,
  startMfaLogin,
  finishMfaLogin,
} from "../service/passkey.js";
import { getUserID } from "../service/get-user-id.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";
import db from "../db.js";

async function handlePasskeyRegister(req, res) {
  const { user } = req;
  const userID = user.id;

  if (!userID) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("userId", userID);

  const { start, finish, credential } = req.body;

  try {
    if (start) {
      const createOptions = await startServerPasskeyRegistration(userID);
      console.log("registration start");
      return res.json({ createOptions });
    }
    if (finish) {
      await finishServerPasskeyRegistration(credential);
      return res.json({ message: "Registered Passkey" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function handleMfaRegister(req, res) {
  const { user } = req;
  const userID = user.id;

  if (!userID) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { start, finish, credential } = req.body;

  try {
    if (start) {
      const createOptions = await startMfaRegistration(userID);
      return res.json({ createOptions });
    }
    if (finish) {
      await finishMfaRegistration(userID, credential);
      const user = db.users.find((user) => user.id === userID);
      user.mfaEnabled = true;
      return res.json({ message: "Registered MFA" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function handlePasskeyLogin(req, res) {
  const { start, finish, options } = req.body;

  try {
    if (start) {
      const loginOptions = await startServerPasskeyLogin();
      return res.json({ loginOptions });
    }
    if (finish) {
      const jwtToken = await finishServerPasskeyLogin(options);
      const userID = await getUserID(jwtToken?.token ?? "");
      console.log("userID from hanko", userID);
      const user = db.users.find((user) => user.id === userID);
      if (!user) {
        return res.status(401).json({ message: "Invalid user" });
      }
      console.log("user", user);
      const sessionId = uuidv4();
      setUser(sessionId, user);
      res.cookie("sessionId", sessionId);
      return res.json({ message: " Passkey Login successful" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during the passke login process." });
  }
}

async function handleMfaLogin(req, res) {
  const { user } = req;
  console.log("userForMfaLogin", user);
  const userID = user.id;
  console.log("userIDfromMFALogin", userID);

  if (!userID) {
    return res.status(401).json({ message: "MFA Login not allowed" });
  }
  const { start, finish, options } = req.body;

  try {
    if (start) {
      const loginOptions = await startMfaLogin(userID);
      console.log("MFA LOGIN START", loginOptions);
      return res.json({ loginOptions });
    }
    if (finish) {
      const jwtToken = await finishMfaLogin(userID, options);
      const newUserID = await getUserID(jwtToken?.token ?? "");
      console.log("userID from hanko", newUserID);
      const user = db.users.find((user) => user.id === newUserID);
      if (!user) {
        return res.status(401).json({ message: "Invalid user" });
      }
      console.log("user", user);
      const sessionId = uuidv4();
      setUser(sessionId, user);
      res.cookie("sessionId", sessionId);
      return res.json({ message: " MFA Passkey Login successful" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during the passkey login process." });
  }
}

export {
  handlePasskeyRegister,
  handlePasskeyLogin,
  handleMfaRegister,
  handleMfaLogin,
};
