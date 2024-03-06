import * as jose from "jose";

async function getUserID(token) {
  const payload = jose.decodeJwt(token ?? "");

  const userID = payload.sub;
  return userID;
}

export { getUserID };
