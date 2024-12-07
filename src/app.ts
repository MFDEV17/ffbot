import { Markup, Telegraf } from "telegraf";
import "dotenv/config";
import { createClientIfNotExist } from "./pocketbase-client";
import { Res } from "./types";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);

bot.start(async (ctx) => {
  await ctx.reply(
    `Привет, ${ctx.from.first_name || ctx.from.username || ""}!`,
    Markup.keyboard([
      [Markup.button.webApp("Сделать заказ", process.env.WEBAPP_URL!)],
    ]).resize(),
  );
  await createClientIfNotExist(ctx.from);
});

bot.on("web_app_data", async (ctx) => {
  if (ctx.webAppData && ctx.webAppData.data) {
    const data: Res = JSON.parse(ctx.webAppData.data.text());
    ctx.reply(data.extraPrice.toString());
  }
});

bot.launch();
