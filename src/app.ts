import { Telegraf } from "telegraf";
import "dotenv/config";
import { createClientIfNotExist } from "./pocketbase-client";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN || "");

bot.start(async (ctx) => {
  await createClientIfNotExist(ctx.from);
  await ctx.reply("Hello!");
});

bot.on("web_app_data", async (ctx) => {
  if (ctx.webAppData && ctx.webAppData.data) {
    const data = ctx.webAppData.data.text();
    ctx.reply(data);
  }
});

bot.launch();
