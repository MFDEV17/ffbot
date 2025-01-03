import PocketBase, { ClientResponseError } from "pocketbase";
import { User } from "telegraf/types";
import { TelegramClient } from "./types";

const client = new PocketBase(process.env.CMS_URL);

export const createClientIfNotExist = async (user: User) => {
  try {
    await client
      .collection("telegram_users")
      .getFirstListItem(`chatid = ${user.id}`);
  } catch (err) {
    if (err instanceof ClientResponseError) {
      if (err.status === 404) {
        await client
          .collection("telegram_users")
          .create({ username: user.username, chatid: user.id, role: "user" });
      }
    }
  }
};

export const getUsers = async () => {
  const clients = await client
    .collection<TelegramClient>("clients")
    .getFullList();
  return clients;
};

export const getManagers = async () => {
  const managers = await client
    .collection<TelegramClient>("employees")
    .getFullList();

  return managers;
};
