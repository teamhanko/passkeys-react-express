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

export { setUser, getUser, clearUserSession };
