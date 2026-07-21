import { Product, User } from '@/types';

export const mockProducts: Product[] = [
  {
    id: 'p1',
    barcode: '00000000001',
    name: 'Mì Ý Buitoni, Gói 500g',
    price: 55000, // 55,000 VND
    weight: 1.1, // ~500g -> ~1.1 lbs
    location_coords: [{ x: 10, y: 20 }],
    imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=150&h=150&fit=crop'
  },
  {
    id: 'p2',
    barcode: '00000000002',
    name: 'Phô mai lát Daiya, Hộp 200g',
    price: 120000, // 120,000 VND
    weight: 0.5, // ~200g
    location_coords: [{ x: 5, y: 15 }],
    imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=150&h=150&fit=crop'
  },
  {
    id: 'p3',
    barcode: '00000000003',
    name: 'Snack khoai tây Ruffles vị Phô mai',
    price: 35000, // 35,000 VND
    weight: 0.4, // ~150g
    location_coords: [{ x: 15, y: 25 }],
    imageUrl: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=150&h=150&fit=crop'
  },
  {
    id: 'p4',
    barcode: '99999999999',
    name: 'Sản phẩm siêu nặng (Thử nghiệm)',
    price: 500000, // 500,000 VND
    weight: 40.0, // 40 lbs
    location_coords: [{ x: 1, y: 1 }],
    imageUrl: ''
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
