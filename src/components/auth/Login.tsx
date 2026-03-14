"use client";

import React, { useState } from 'react';
import { QrCode, Mail, Lock, LogIn, ChevronRight, X } from 'lucide-react';

export function Login({ onRegisterClick, onLoginSuccess }: { onRegisterClick?: () => void, onLoginSuccess?: () => void }) {
  const [antiGravity, setAntiGravity] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCF8F8] font-['Helvetica'] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#222222 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className={`w-full max-w-md bg-white p-10 rounded-[48px] shadow-2xl border border-gray-50 relative z-10 transition-all duration-700 ${antiGravity ? 'scale-110 rotate-2' : ''}`}>
        <button onClick={() => setAntiGravity(!antiGravity)} className="absolute -top-4 -right-4 bg-[#FF0000] text-white p-3 rounded-full shadow-lg hover:rotate-12 transition-all cursor-pointer">🚀</button>
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#FF0000] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#FF0000]/30 transform rotate-3">
             <span className="text-white text-3xl font-black italic">P</span>
          </div>
          <h1 className="text-3xl font-black text-[#222222] tracking-tighter uppercase italic">Masuk PAT MART</h1>
          <p className="text-sm text-gray-400 mt-2 font-bold uppercase tracking-widest">Belum punya akun? <span className="text-[#FF0000] cursor-pointer hover:underline" onClick={onRegisterClick}>Daftar</span></p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nomor HP atau Email</label>
              <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#FF0000] rounded-2xl outline-none transition-all font-medium" />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Kata Sandi</label>
              <input type="password" placeholder="Masukkan kata sandi..." className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#FF0000] rounded-2xl outline-none transition-all font-medium" />
            </div>
          </div>

          <div className="flex justify-end">
            <span className="text-xs font-black text-[#FF0000] uppercase tracking-tighter cursor-pointer hover:underline">Lupa kata sandi?</span>
          </div>

          <button onClick={onLoginSuccess} className="w-full bg-[#222222] text-white py-5 rounded-3xl font-black text-lg uppercase tracking-tighter hover:bg-[#FF0000] transform active:scale-95 transition-all shadow-xl">
            SELANJUTNYA
          </button>

          <div className="relative py-2 text-center">
            <span className="bg-white px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Atau masuk dengan</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center justify-center gap-3 p-4 border-2 border-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-[#222222] transition-all">
              <QrCode size={18} /> Scan Kode QR
            </button>
            <button className="flex items-center justify-center gap-3 p-4 border-2 border-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-[#222222] transition-all">
              Metode Lain
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Butuh bantuan? <span className="text-[#A0D585]">Hubungi PAT MART Care</span></p>
        </div>
      </div>
    </div>
  );
}
