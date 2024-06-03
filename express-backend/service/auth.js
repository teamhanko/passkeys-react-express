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

// Function to set a user with a temporary session ID
function setUserTempSession(tempSessionId, user) {
  tempSessions.set(tempSessionId, user);
}

// Function to get a user from a temporary session ID
function getUserFromTempSession(tempSessionId) {
  return tempSessions.get(tempSessionId);
}

// Function to clear a temporary session
function clearTempSession(tempSessionId) {
  tempSessions.delete(tempSessionId);
}

export { setUser, getUser, clearUserSession, setUserTempSession, getUserFromTempSession, clearTempSession};
