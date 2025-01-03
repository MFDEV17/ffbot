export type TelegramClient = {
  id: string;
  username: string;
  chatid: number;
};

export type WebappData = {
  cartmap: CartMap;
  orderInfo: OrderInfo;
  currencyChoice: Currency;
  methodChoice: DeliveryMethod;
};

type OrderInfo = {
  finalOrderSum: number;
  finalOrderSumInCurrency: number;
  deliveryPriceInCurrency: number;
  itemsPriceSumInCurrency: number;
  extraDeliveryPriceSumInCurrency: number;
  deliveryPrice: number;
  itemsPriceSum: number;
  extraDeliveryPriceSum: number;
  redemptionFeeSum: number;
  weightSum: number;
  deliveryPriceDiffInCurrency: number;
  deliveryType: "courier" | "mail";
};

type CartMap = {
  [key: string]: {
    carts: StoreCart[];
    shop: Shop;
  };
};

export type Category = {
  id: string;
  category_name: string;
  single_category_name?: string;
  default_weight: number;
  category_image: string;
};

export type Currency = {
  id: string;
  currency_name: string;
  currency_symbol: string;
  amount_to_euro: number;
  redemption_in_currency: number;
  currency_code: string;
  formattedCurrency: string;
};

export type DeliveryMethod = {
  id: string;
  delivery_name: string;
  hint?: string;
  delivery_speed: number;
  delivery_ranges: DeliveryRange[];
};

export type DeliveryRange = {
  id: string;
  from: number;
  to: number;
  price: number;
};

export type Shop = {
  id: string;
  shop_name: string;
  shop_link: string;
  special_commission_active: boolean;
  special_commission_amount: number;
  extra_delivery_price_amount: number;
  free_delivery_price_amount: number;
};

export type StoreCartFormProps = {
  priceEuro: number;
  size: string;
  weight: number;
  link: string;
  comment: string;
  count: number;
  _id: string;
};

export type StoreCart = {
  formValues: StoreCartFormProps;
  category: Category;
};
