import { Context } from "telegraf";
import { WebappData } from "../types";
import BigNumber from "bignumber.js";
import { formatCurrency } from "../utils/format-currency";

export const formatOrderMessage = async (data: WebappData, ctx: Context) => {
  let msg = "<b>Поступил новый заказ</b>\n\n";

  if (ctx.from && ctx.from.username) {
    msg += `<b>Пользователь</b>: @${ctx.from?.username}\n\n`;
  } else {
    msg += `<b>Пользователь</b>: <a href="tg://user?id=${ctx.from?.id}">Профиль</a>\n\n`;
  }
  msg += "<u>Детали заказа:</u>\n\n";

  const {
    currencyChoice,
    methodChoice: { delivery_name },
    orderInfo: {
      weightSum,
      finalOrderSumInCurrency,
      itemsPriceSumInCurrency,
      deliveryPriceInCurrency,
      deliveryType,
      deliveryPriceDiffInCurrency,
    },
  } = data;

  for (const shopname in data.cartmap) {
    msg += `<u><b>${shopname}</b></u>\n\n`;

    data.cartmap[shopname].carts.forEach((cart, index) => {
      const {
        category: { single_category_name, category_name },
        formValues: { size, count, priceEuro, comment, weight, link },
      } = cart;

      msg += `${index + 1}. ${single_category_name || category_name} `;

      if (count > 1) {
        const weightSum = new BigNumber(weight).multipliedBy(count).toNumber();
        msg += `${weight} * ${count} = ${weightSum} кг., `;
      } else {
        msg += `${weight} кг., `;
      }

      if (size) {
        msg += `размер ${size}, `;
      }

      const sumPriceEuro = new BigNumber(priceEuro).multipliedBy(count);
      const sumPriceCurrency = new BigNumber(sumPriceEuro).multipliedBy(
        currencyChoice.amount_to_euro,
      );

      if (count > 1) {
        msg += `стоимость ${priceEuro} * ${count} = ${formatCurrency("eur", sumPriceEuro.toNumber())} / ${formatCurrency(currencyChoice.currency_code, sumPriceCurrency.toNumber())} `;
      } else {
        msg += `стоимость ${formatCurrency("eur", sumPriceEuro.toNumber())} / ${formatCurrency(currencyChoice.currency_code, sumPriceCurrency.toNumber())} `;
      }

      if (comment) {
        msg += `, а ещё: <blockquote expandable>${comment}</blockquote>\n`;
      }

      msg += `\n<a href="${link}">Ссылка</a>\n\n`;
    });
  }

  msg += `\n\n`;
  msg += `Актуальный курс: ${formatCurrency(currencyChoice.currency_code, currencyChoice.amount_to_euro)} / €1\n`;
  msg += `Стоимость товаров: ${formatCurrency(currencyChoice.currency_code, itemsPriceSumInCurrency)}\n`;
  msg += `Стоимость доставки: ${formatCurrency(currencyChoice.currency_code, deliveryPriceInCurrency)}\n`;
  msg += `Вес посылки: ${weightSum} кг\n`;

  msg += `Метод доставки: ${delivery_name} `;

  if (deliveryType === "courier") {
    msg += `(+ ${formatCurrency(currencyChoice.currency_code, deliveryPriceDiffInCurrency)} к доплате за курьера)`;
  }
  msg += `\n\n`;

  msg += `Финальная стоимость: ${formatCurrency(currencyChoice.currency_code, finalOrderSumInCurrency)} с учетом доставки и всех расходов`;

  return msg;
};
