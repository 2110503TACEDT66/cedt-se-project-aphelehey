export interface ReservationItem {
  _id?: string;
  revDate: string;
  user: string;
  restaurant?: RestaurantItem;
  createdAt: string;
  token?: string;
  restaurantId?: string;
}

export interface RestaurantItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  region: string;
  openCloseTime: string;
  picture: string;
  reservation: Array<object>;
  id: string;
}

export interface MenuItem {
  name: string;
  img: string;
}

export interface RestaurantJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: RestaurantItem[];
}

export interface MenuJson {
  sucess: boolean;
  count: number;
  data: MenuItem[];
}

export interface MenuItem {
  _id: string;
  name: string;
  food: Array<FoodItem>;
}

export interface FoodItem {
  name: string;
  img: string;
}

export interface ReservationJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: ReservationItem[];
}

export interface AddressesItem{
  address: string;
  district: string;
  province: string;
  postalcode: string;
  region: string;
}

export interface UserAddressItem{
  _id: string;
  name: string;
  addresses: UserAddress;
}

export interface UserAddress {
  address: string;
  district: string;
  province: string;
  postalcode: string;
  region: string;
}


export interface AddressesItem{
  address: string;
  district: string;
  province: string;
  postalcode: string;
  region: string;
}

export interface UserAddressItem{
  _id: string;
  name: string;
  addresses: UserAddress;
}

export interface UserAddress {
  address: string;
  district: string;
  province: string;
  postalcode: string;
  region: string;
}


export interface locationItem {
  address: string;
  district: string;
  province: string;
  postalcode: string;
  region: string;
  _id: string;
}

export interface restaurantItem {
  _id: string;
  name: string;
  id: string;
}

export interface paymentItem {
  _id: string;
  user: string;
  food: string[];
  price: number;
  payment: boolean;
  location: locationItem;
  restaurant: restaurantItem;
  createdAt: string;
  __v: number;
}


export interface PaymentItem {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardName: string;
  cardNum: string;
  expDate: string;
  cvv: string;
}
export interface salesDataJson {
  success: boolean;
  count: number;
  sales: number;
  data: paymentItem[];
}