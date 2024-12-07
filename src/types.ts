export type TelegramClient = {
  id: string;
  username: string;
  userid: number;
  first_name: string;
  role: "client" | "manager" | "admin";
};

export type Res = {
  jsonlist: Jsonlist;
  extraPrice: number;
};

export type Jsonlist = {
  [key: string]: Shop;
};

export type Shop = {
  carts: Cart[];
  deliveryPrice: number;
};

export type Cart = {
  count: number;
  productLink: string;
  price: number;
  weight: number;
  id: string;
  categoryRef: CategoryRef;
  shopRef?: ShopRef;
  priceCurrencyChoice: number;
  extraDeliveryPrice?: number;
};

export type CategoryRef = {
  category_image: string;
  category_name: string;
  collectionId: string;
  collectionName: string;
  default_weight: number;
  id: string;
  single_category_name: string;
};

export type ShopRef = {
  id: string;
  collectionName: string;
  extra_delivery_price_amount: number;
  free_delivery_price_amount: number;
  shop_link: string;
  shop_name: string;
  special_commission_active: boolean;
  special_commission_amount: number;
};
