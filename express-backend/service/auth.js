const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  return sessionIdToUserMap.get(id);
}

function clearUserSession(id) {
  sessionIdToUserMap.delete(id);
}


const tempSessions = new Map();  // This holds temporary session IDs and user details


function setUserTempSession(tempSessionId, user) {
  tempSessions.set(tempSessionId, user);
}

function getUserFromTempSession(tempSessionId) {
  return tempSessions.get(tempSessionId);
}

function clearTempSession(tempSessionId) {
  tempSessions.delete(tempSessionId);
}

export { setUser, getUser, clearUserSession, setUserTempSession, getUserFromTempSession, clearTempSession};
