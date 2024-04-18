export interface ReservationItem {
  _id?: string;
  revDate: string;
  user: string;
  restaurant?: RestaurantItem;
  createdAt: string;
  token?:string;
  restaurantId? : string
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
  sucess: boolean
  count: number
  data: MenuItem[]
}

export interface MenuItem {
  _id: string
  name: string
  food: Array<FoodItem>
}

export interface FoodItem {
  name: string
  img: string
}

export interface ReservationJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: ReservationItem[];
}

export interface PaymentItem {
  _id: number;
  user: boolean;
  food: string[];
  price: number;
  payment: boolean;
  restaurant: 
}