import PocketBase, { ClientResponseError } from "pocketbase";
import { User } from "telegraf/types";

const client = new PocketBase(process.env.CMS_URL);

export const createClientIfNotExist = async (user: User) => {
  try {
    await client
      .collection("telegram_users")
      .getFirstListItem(`userid = ${user.id}`);
  } catch (err) {
    if (err instanceof ClientResponseError) {
      if (err.status === 404) {
        const { username, id: userid, first_name } = user;
        await client
          .collection("telegram_users")
          .create({ username, userid, first_name, role: "client" });
      }
    }
  }
};

export const getUsers = async () => {
  const clients = await client
    .collection<{
      id: string;
      first_name: string;
      role: "client" | "manager" | "admin";
      username: string;
      userid: number;
    }>("telegram_users")
    .getFullList({ filter: "role='client'" });
  return clients;
};

export const getManagers = async () => {
  const managers = await client
    .collection<{
      id: string;
      first_name: string;
      role: "client" | "manager" | "admin";
      username: string;
      userid: number;
    }>("telegram_users")
    .getFullList({
      filter: 'role = "manager"',
      fields: "id, first_name, role, username, userid",
    });

  return managers;
};
