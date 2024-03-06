import { tenant } from "@teamhanko/passkeys-sdk";
import dotenv from "dotenv";
import db from "../db.js";

dotenv.config();

const passkeyApi = tenant({
  apiKey: process.env.PASSKEYS_API_KEY,
  tenantId: process.env.PASSKEYS_TENANT_ID,
});

async function startServerPasskeyRegistration(userID) {
  const user = db.users.find((user) => user.id === userID);

  const createOptions = await passkeyApi.registration.initialize({
    userId: user.id,
    username: user.email || "",
  });

  return createOptions;
}

async function finishServerPasskeyRegistration(credential) {
  await passkeyApi.registration.finalize(credential);
}

async function startServerPasskeyLogin() {
  const options = await passkeyApi.login.initialize();
  return options;
}

async function finishServerPasskeyLogin(options) {
  const response = await passkeyApi.login.finalize(options);
  return response;
}

export {
  startServerPasskeyRegistration,
  finishServerPasskeyRegistration,
  startServerPasskeyLogin,
  finishServerPasskeyLogin,
};
