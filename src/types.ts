export type MealType = 'Sáng' | 'Trưa' | 'Chiều';
export type Weekday = 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7';

export interface MenuItem {
  id: number;
  weekday: Weekday;
  mealType: MealType;
  dishName: string;
  image: string;
  price: number;
  calories?: number;
  protein?: number;
  carbs?: number;
}

export interface District {
  id: string;
  name: string;
}

export interface Customer {
  phone: string;
  fullName: string;
  address: string;
  district: string;
  feeShip: number;
  timeReceive: string;
  startDate: string;
  endDate: string;
  promote?: string;
}

export interface Order {
  orderId: string;
  orderDate: string;
  phone: string;
  fullName: string;
  address: string;
  district: string;
  timeReceive?: string;
  fee: string;
  note: string;
  plan: string;
  weeks: number;
  orderDetails: Record<string, number>;
  totalAmount: number;
  paymentMethod?: string;
  status: string;
  paymentProof?: string;
}

export interface UserChoosePackage {
  idWeek: string;
  idDay: string;
  idMeal: string;
  price: number;
  quantity?: number;
}
