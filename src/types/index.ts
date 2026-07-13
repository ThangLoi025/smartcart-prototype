export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discountAmount: number;
  status: 'ACTIVE' | 'EXPIRED' | 'USED';
  expiryDate: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  membershipLevel: 'ĐỒNG' | 'BẠC' | 'VÀNG' | 'KIM CƯƠNG';
  status: 'ACTIVE' | 'INACTIVE';
  points: number;
  vouchers: Voucher[];
}

export interface Product {
  id: string;
  barcode: string;
  name: string;
  price: number; // in cents
  weight: number; // in lbs
  location_coords: { x: number; y: number }[];
}

export interface CartSession {
  sessionId: string;
  status: 'GUEST' | 'LOGGED_IN';
  userId: string | null;
  items: Product[];
  totalAmount: number; // in cents
  totalWeight: number; // in lbs
}
