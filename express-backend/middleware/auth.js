// import { getUser, getUserFromTempSession } from "../service/auth.js";

// async function restrictToLoggedinUserOnly(req, res, next) {
//   const userUid = req.cookies?.sessionId;

//   if (!userUid) {
//     return res
//       .status(401)
//       .json({ message: "Unauthorized: No active session found" });
//   }

//   const user = await getUser(userUid);

//   if (!user) {
//     return res
//       .status(401)
//       .json({ message: "Unauthorized: Session invalid or expired" });
//   }

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   const userUid = req.cookies?.sessionId;
  
//   if (!userUid) {
//     return res
//       .status(401)
//       .json({ message: "Unauthorized: No active session found" });
//   }

//   const user = getUser(userUid);

//   req.user = user;
//   next();
// }


import { getUser, getUserFromTempSession } from "../service/auth.js";

async function restrictToLoggedinUserOnly(req, res, next) {
  const fullSessionId = req.cookies?.sessionId;
  const tempSessionId = req.cookies?.tempSessionId;

  if (!fullSessionId && !tempSessionId) {
    return res.status(401).json({ message: "Unauthorized: No active session found" });
  }

  if (fullSessionId) {
    const user = await getUser(fullSessionId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Session invalid or expired" });
    }
    req.user = user;
    next();
  } else if (tempSessionId) {
    const user = await getUserFromTempSession(tempSessionId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Temporary session invalid or expired" });
    }
    console.log("TempSessionUser", user);
    // Optionally, you might restrict access to only MFA-related routes here
    req.user = user;
    next();
  }
}

async function checkAuth(req, res, next) {
  const sessionId = req.cookies?.sessionId || req.cookies?.tempSessionId;
  
  if (!sessionId) {
    return res.status(401).json({ message: "Unauthorized: No active session found" });
  }

  const user = await (req.cookies?.sessionId ? getUser(sessionId) : getUserFromTempSession(sessionId));

  if (!user) {
    return res.status(401).json({ message: "Unauthorized: Session invalid or expired" });
  }

  req.user = user;
  next();
}

export { restrictToLoggedinUserOnly, checkAuth };
