import { Telegraf } from "telegraf";
import "dotenv/config";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN || "");

bot.start((ctx) => {
  ctx.reply(`hello ${ctx.from.username}`);
});

bot.launch();
