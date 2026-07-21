'use client';

import { useState } from 'react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { ViewState } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { ArrowLeft, Mail, Lock, User as UserIcon } from 'lucide-react';

export default function AuthView() {
  const { setActiveView, isProcessing, setProcessing } = useUIStore();
  const { setSessionMode, setCurrentUser } = useCartStore();
  const [isLogin, setIsLogin] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        // Đăng nhập
        const res = await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            mode: 'LOGGED_IN', 
            email: formData.email, 
            password: formData.password 
          })
        });
        const data = await res.json();

        if (res.ok && data.user) {
          setSessionMode('LOGGED_IN', data.user.id);
          setCurrentUser(data.user);
          setActiveView(ViewState.MEMBER_DASHBOARD);
        } else {
          setErrorMsg(data.error || 'Sai email hoặc mật khẩu.');
        }
      } else {
        // Đăng ký
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        
        if (res.ok) {
          // Tự động đăng nhập sau khi đăng ký thành công
          setSessionMode('LOGGED_IN', data.user.id);
          setCurrentUser(data.user);
          setActiveView(ViewState.MEMBER_DASHBOARD);
        } else {
          setErrorMsg(data.error || 'Đăng ký thất bại.');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setErrorMsg('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center px-8 bg-slate-50 overflow-hidden">
      {/* Back button */}
      <button 
        onClick={() => setActiveView(ViewState.WELCOME)}
        className="absolute top-8 left-8 flex items-center text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại
      </button>

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">
          {isLogin ? 'Đăng Nhập' : 'Đăng Ký Tài Khoản'}
        </h2>
        
        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${isLogin ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => { setIsLogin(true); setErrorMsg(''); }}
          >
            Đăng nhập
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${!isLogin ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => { setIsLogin(false); setErrorMsg(''); }}
          >
            Đăng ký
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full rounded-xl border border-slate-300 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Nguyễn Văn A" 
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10 w-full rounded-xl border border-slate-300 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="email@example.com" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10 w-full rounded-xl border border-slate-300 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="••••••••" 
              />
            </div>
          </div>

          <Button 
            variant="primary" 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white mt-6 py-4 shadow-md" 
            disabled={isProcessing}
          >
            {isProcessing ? 'Đang xử lý...' : (isLogin ? 'Đăng Nhập' : 'Đăng Ký')}
          </Button>
        </form>
      </div>
    </div>
  );
}
