import { Markup, Telegraf } from "telegraf";
import "dotenv/config";
import { createClientIfNotExist, getManagers } from "./pocketbase-client";
import { WebappData } from "./types";
import { formatOrderMessage } from "./service/format-message-manager";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);

bot.start(async (ctx) => {
  await ctx.reply(
    `Привет, ${ctx.from.first_name || ctx.from.username || ctx.from.id}!`,
    Markup.keyboard([
      [
        Markup.button.webApp(
          "Сделать заказ",
          "https://calculator.fasales.delivery",
        ),
      ],
    ]).resize(),
  );
  await createClientIfNotExist(ctx.from);
});

bot.on("web_app_data", async (ctx) => {
  if (ctx.webAppData && ctx.webAppData.data) {
    const data = ctx.webAppData.data.json<WebappData>();
    console.log(data);

    const msg = await formatOrderMessage(data, ctx);
    const managers = await getManagers();

    for (const { chatid } of managers) {
      await ctx.telegram.sendMessage(chatid, msg, { parse_mode: "HTML" });
    }

    await ctx.sendMessage(
      "Спасибо за заказ! В скоро времени с Вами свяжется менеджер",
    );
  }
});

bot.launch();
