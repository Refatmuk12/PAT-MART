"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Apple } from "lucide-react";

export function Register({ onLoginClick }: { onLoginClick: () => void }) {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = "Nama Lengkap wajib diisi";
    if (!formData.contact) newErrors.contact = "Nomor HP / Email wajib diisi";
    if (!formData.password) newErrors.password = "Kata sandi wajib diisi";
    else if (formData.password.length < 6) newErrors.password = "Kata sandi minimal 6 karakter";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Kata sandi tidak cocok";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Registration successful! Welcome to PAT MART.");
      onLoginClick();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FCF8F8] font-['Helvetica'] flex relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#222222 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="flex w-full max-w-6xl mx-auto my-auto shadow-2xl rounded-[48px] overflow-hidden bg-white z-10 animate-in slide-in-from-bottom-8 duration-700">
        
        {/* Left Side - Marketing & Branding */}
        <div className="hidden lg:flex flex-col w-1/2 bg-[#222222] p-12 relative text-white justify-between overflow-hidden">
          {/* Abstract Pop Mart Shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF0000] rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A0D585] rounded-full blur-3xl opacity-10 transform -translate-x-1/4 translate-y-1/4"></div>

          <div className="z-10">
            <div className="w-16 h-16 bg-[#FF0000] rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-[#FF0000]/30 transform -rotate-3">
              <span className="text-white text-3xl font-black italic">P</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-tight">
              Belanja Spesial<br />
              <span className="text-[#FF0000]">Koleksi Exclusive</span><br />
              Hanya Di Sini.
            </h1>
            <p className="mt-6 text-gray-400 font-medium max-w-sm">
              Bergabunglah dengan jutaan kreator dan kolektor di PAT MART. Temukan art toys favoritmu dengan pengalaman belanja tercepat.
            </p>
          </div>

          <div className="z-10 flex gap-4">
             {/* Mock floating capsules representing toys/benefits */}
             <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10 animate-in fade-in slide-in-from-bottom-10 delay-300">
                <span className="text-2xl block mb-2">🚀</span>
                <span className="font-bold text-sm tracking-widest uppercase">Fast Auth</span>
             </div>
             <div className="bg-[#FF0000]/20 backdrop-blur rounded-2xl p-4 border border-[#FF0000]/30 animate-in fade-in slide-in-from-bottom-10 delay-500">
                <span className="text-2xl block mb-2">💎</span>
                <span className="font-bold text-sm tracking-widest uppercase">Premium</span>
             </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-10 lg:p-16 bg-white flex flex-col justify-center">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-[#222222] tracking-tighter uppercase italic">Daftar</h2>
            <p className="text-sm text-gray-400 mt-2 font-bold uppercase tracking-widest">
              Sudah punya akun? <span onClick={onLoginClick} className="text-[#FF0000] cursor-pointer hover:underline">Masuk</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nama Lengkap</Label>
              <Input 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-6 py-6 bg-gray-50 border-2 ${errors.fullName ? 'border-[#FF0000]' : 'border-transparent focus:border-[#222222]'} rounded-2xl outline-none transition-all font-medium`}
              />
              {errors.fullName && <p className="text-[10px] text-[#FF0000] font-bold mt-1 ml-4">{errors.fullName}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nomor HP atau Email</Label>
              <Input 
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className={`w-full px-6 py-6 bg-gray-50 border-2 ${errors.contact ? 'border-[#FF0000]' : 'border-transparent focus:border-[#222222]'} rounded-2xl outline-none transition-all font-medium`}
              />
              {errors.contact && <p className="text-[10px] text-[#FF0000] font-bold mt-1 ml-4">{errors.contact}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Kata Sandi</Label>
                <Input 
                  name="password" type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-6 py-6 bg-gray-50 border-2 ${errors.password ? 'border-[#FF0000]' : 'border-transparent focus:border-[#222222]'} rounded-2xl outline-none transition-all font-medium`}
                />
                {errors.password && <p className="text-[10px] text-[#FF0000] font-bold mt-1 ml-4">{errors.password}</p>}
              </div>

              <div className="space-y-1">
                <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Konfirmasi Sandi</Label>
                <Input 
                  name="confirmPassword" type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-6 py-6 bg-gray-50 border-2 ${errors.confirmPassword ? 'border-[#FF0000]' : 'border-transparent focus:border-[#222222]'} rounded-2xl outline-none transition-all font-medium`}
                />
                {errors.confirmPassword && <p className="text-[10px] text-[#FF0000] font-bold mt-1 ml-4">{errors.confirmPassword}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#FF0000] text-white py-8 rounded-3xl font-black text-lg uppercase tracking-tighter hover:bg-[#222222] transform active:scale-95 transition-all shadow-xl shadow-[#FF0000]/20 mt-4 h-auto">
              DAFTAR SEKARANG
            </Button>
          </form>

          <div className="relative py-6 text-center">
            <span className="bg-white px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Atau daftar dengan</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center justify-center gap-3 p-6 border-2 border-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-[#222222] hover:bg-transparent transition-all h-auto">
              <Apple size={18} /> Apple
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-3 p-6 border-2 border-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-[#222222] hover:bg-transparent transition-all h-auto">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Dengan mendaftar, Anda menyetujui <span className="text-[#222222] cursor-pointer hover:underline">Syarat & Ketentuan</span> PAT MART
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
