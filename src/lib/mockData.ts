import { Product, User } from '@/types';

export const mockProducts: Product[] = [
  {
    id: 'p1',
    barcode: '00000000001',
    name: 'Chuối hữu cơ (Nải)',
    price: 50000, // 50,000 VND
    weight: 2.5, // 2.5 lbs
    location_coords: [{ x: 10, y: 20 }]
  },
  {
    id: 'p2',
    barcode: '00000000002',
    name: 'Sữa tươi nguyên kem 1 Gallon',
    price: 90000, // 90,000 VND
    weight: 8.6, // 8.6 lbs (approx 1 gallon of milk)
    location_coords: [{ x: 5, y: 15 }]
  },
  {
    id: 'p3',
    barcode: '00000000003',
    name: 'Bánh mì men tự nhiên',
    price: 40000, // 40,000 VND
    weight: 1.0, // 1 lb
    location_coords: [{ x: 15, y: 25 }]
  },
  {
    id: 'p4',
    barcode: '99999999999',
    name: 'Sản phẩm siêu nặng (Thử nghiệm)',
    price: 500000, // 500,000 VND
    weight: 40.0, // 40 lbs
    location_coords: [{ x: 1, y: 1 }]
  }
];

export const mockUsers: Record<string, User> = {
  'user_123': {
    id: 'user_123',
    name: 'Phạm Thắng Lợi',
    phone: '0901234567',
    membershipLevel: 'VÀNG',
    status: 'ACTIVE',
    points: 1250,
    vouchers: [
      {
        id: 'v_10off',
        code: 'GIAM10K',
        title: 'Giảm 10.000đ cho đơn từ 100k',
        description: 'Áp dụng cho tất cả sản phẩm',
        discountAmount: 10000,
        status: 'ACTIVE',
        expiryDate: '2026-12-31'
      },
      {
        id: 'v_freeshipping',
        code: 'FREESHIP',
        title: 'Miễn phí vận chuyển',
        description: 'Tối đa 30.000đ',
        discountAmount: 30000,
        status: 'ACTIVE',
        expiryDate: '2026-08-15'
      },
      {
        id: 'v_expired50k',
        code: 'GIAM50K',
        title: 'Giảm 50.000đ dịp Tết',
        description: 'Đã hết hạn',
        discountAmount: 50000,
        status: 'EXPIRED',
        expiryDate: '2026-02-01'
      }
    ]
  }
};
