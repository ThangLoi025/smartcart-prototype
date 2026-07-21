'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';
import { LayoutDashboard, ShoppingCart, BarChart3, Presentation, LogOut, Bell, User, TabletSmartphone } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, adminUser, logout } = useAdminStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, pathname, router, isMounted]);

  if (!isMounted) return null;

  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  if (!isAuthenticated) return null;

  const navigation = [
    { name: 'Tổng quan', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Quản lý thiết bị', href: '/admin/devices', icon: TabletSmartphone },
    { name: 'Quản lý giỏ hàng', href: '/admin/carts', icon: ShoppingCart },
    { name: 'Doanh thu & Rủi ro', href: '/admin/revenue', icon: BarChart3 },
    { name: 'Quảng cáo & Banner', href: '/admin/campaigns', icon: Presentation },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">SmartCart Admin</h1>
          <p className="text-xs text-slate-400 mt-1">Hệ thống quản lý siêu thị</p>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center text-sm">
            <User className="h-8 w-8 p-1.5 bg-slate-800 rounded-full text-slate-300 mr-3" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{adminUser?.name}</p>
              <p className="text-slate-400 text-xs truncate">{adminUser?.role}</p>
            </div>
            <button onClick={logout} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg" title="Đăng xuất">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-semibold text-slate-800">
            {navigation.find(n => pathname.startsWith(n.href))?.name || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
