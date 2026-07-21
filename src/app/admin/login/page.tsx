'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';
import Button from '@/components/ui/Button';
import { ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAdminStore();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Giả lập login thành công
    login();
    router.push('/admin/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Quản trị SmartCart</h1>
          <p className="text-sm text-slate-500 mt-2">Đăng nhập tài khoản Quản lý Siêu thị</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tài khoản</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
          
          <Button variant="primary" type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
            Đăng nhập
          </Button>
        </form>
        
        <div className="mt-6 text-center text-xs text-slate-400">
          <p>Tài khoản demo: admin / 123456</p>
        </div>
      </div>
    </div>
  );
}
