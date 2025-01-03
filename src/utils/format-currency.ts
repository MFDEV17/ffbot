export const formatCurrency = (currencyCode: string, amount: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 1,
  }).format(amount);
};
