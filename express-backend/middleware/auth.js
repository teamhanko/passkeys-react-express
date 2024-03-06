import { getUser } from "../service/auth.js";

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.sessionId;

  if (!userUid) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No active session found" });
  }

  const user = await getUser(userUid);

  if (!user) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Session invalid or expired" });
  }

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.sessionId;
  
  if (!userUid) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No active session found" });
  }

  const user = getUser(userUid);

  req.user = user;
  next();
}

export { restrictToLoggedinUserOnly, checkAuth };
