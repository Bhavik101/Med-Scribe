import { Account, Client, Databases } from "node-appwrite";

const client = new Client();
client
  .setProject(process.env.PROJECT_ID!)
  .setEndpoint(process.env.API_ENDPOINT!)
  .setKey(process.env.API_KEY!);

const database = new Databases(client);
const adminAccount = new Account(client);
export { database, client, adminAccount };

export const getSessionClient = (session?: string) => {
  if (session) {
    //  local client without api key for limited access
    const client = new Client();
    client
      .setProject(process.env.PROJECT_ID!)
      .setEndpoint(process.env.API_ENDPOINT!)
      .setSession(session);

    const sessionAccount = new Account(client);
    const sessionDatabase = new Databases(client);
    return { sessionAccount, sessionDatabase };
  }
  return { sessionAccount: null, sessionDatabase: null };
};
