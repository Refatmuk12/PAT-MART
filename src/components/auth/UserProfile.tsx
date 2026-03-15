import React, { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { Camera, MapPin, Search, ArrowLeft, ShieldCheck, CheckCircle2, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function UserProfile({ onBack }: { onBack: () => void }) {
  const currentUser = useCartStore(state => state.currentUser);
  const [activeTab, setActiveTab] = useState('biodata');

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-[#f3f4f5] font-['Helvetica'] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-[#FF0000]">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#222222] uppercase tracking-tighter">{currentUser.fullName}</h1>
            <Badge className="bg-[#A0D585]/20 text-[#A0D585] border-none font-bold uppercase tracking-widest text-[8px] px-2 shadow-none">Member</Badge>
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="max-w-5xl mx-auto px-4 flex gap-8 overflow-x-auto no-scrollbar">
          {["Biodata Diri", "Daftar Alamat", "Pembayaran", "Rekening Bank", "Notifikasi", "Mode Tampilan", "Keamanan"].map(tab => {
            const id = tab.toLowerCase().split(' ')[0];
            return (
              <button 
                key={id}
                onClick={() => setActiveTab(id)}
                className={`py-4 text-sm font-bold border-b-4 whitespace-nowrap transition-colors ${activeTab === id ? 'border-[#00aa5b] text-[#00aa5b]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                style={activeTab === id ? { borderColor: '#A0D585', color: '#222222' } : {}}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          
          {/* TAB: BIODATA */}
          {activeTab === 'biodata' && (
            <div className="flex flex-col md:flex-row gap-10">
              {/* Left Column: Photo & PIN */}
              <div className="w-full md:w-80 flex flex-col gap-4">
                <div className="border border-gray-200 rounded-2xl p-4 shadow-sm">
                  <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden relative group">
                    <img src="https://i.ibb.co/L5hY5M2/friends.jpg" alt="Profile" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="text-white" size={32} />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full font-bold mb-3 border-gray-200 hover:bg-gray-50 text-[#222222]">Pilih Foto</Button>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</p>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start font-bold border-gray-200 h-12 text-[#222222]">Buat Kata Sandi</Button>
                  <Button variant="outline" className="w-full justify-start font-bold border-gray-200 h-12 text-[#222222]"><LockKeyhole className="mr-3 w-4 h-4 text-gray-400" /> PIN Tokopedia</Button>
                  <Button variant="outline" className="w-full justify-start font-bold border-gray-200 h-12 text-[#222222]"><ShieldCheck className="mr-3 w-4 h-4 text-gray-400" /> Verifikasi Instan</Button>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="flex-1 space-y-8">
                {/* Biodata Section */}
                <div>
                  <h3 className="text-sm font-bold text-[#222222] mb-6">Ubah Biodata Diri</h3>
                  <div className="grid grid-cols-[120px_1fr] gap-y-6 items-center">
                    <span className="text-sm text-gray-500">Nama</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-[#222222]">{currentUser.fullName}</span>
                      <span className="text-xs font-bold text-[#A0D585] cursor-pointer hover:underline">Ubah</span>
                    </div>

                    <span className="text-sm text-gray-500">Tanggal Lahir</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-[#222222]">12 Maret 1999</span>
                      <span className="text-xs font-bold text-[#A0D585] cursor-pointer hover:underline">Ubah Tanggal Lahir</span>
                    </div>

                    <span className="text-sm text-gray-500">Jenis Kelamin</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-[#222222]">Pria</span>
                      <span className="text-xs font-bold text-[#A0D585] cursor-pointer hover:underline">Ubah</span>
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div>
                  <h3 className="text-sm font-bold text-[#222222] mb-6 pt-4 border-t border-gray-100">Ubah Kontak</h3>
                  <div className="grid grid-cols-[120px_1fr] gap-y-6 items-center">
                    <span className="text-sm text-gray-500">Email</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-[#222222]">{currentUser.contact.includes('@') ? currentUser.contact : 'mukmin.refat05@gmail.com'}</span>
                      <Badge className="bg-[#A0D585]/20 text-[#A0D585] hover:bg-[#A0D585]/30 border-none font-bold text-[10px] uppercase shadow-none tracking-widest">Terverifikasi</Badge>
                      <span className="text-xs font-bold text-[#A0D585] cursor-pointer hover:underline ml-2">Ubah</span>
                    </div>

                    <span className="text-sm text-gray-500">Nomor HP</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-[#222222]">{!currentUser.contact.includes('@') ? currentUser.contact : '081234567890'}</span>
                      <Badge className="bg-[#A0D585]/20 text-[#A0D585] hover:bg-[#A0D585]/30 border-none font-bold text-[10px] uppercase shadow-none tracking-widest">Terverifikasi</Badge>
                      <span className="text-xs font-bold text-[#A0D585] cursor-pointer hover:underline ml-2">Ubah</span>
                    </div>
                  </div>
                </div>

                {/* Safe Mode Section */}
                <div>
                   <h3 className="text-sm font-bold text-[#222222] mb-4 pt-4 border-t border-gray-100">Safe Mode</h3>
                   <p className="text-xs text-gray-500 leading-relaxed mb-4 max-w-md">Fitur ini akan otomatis menyaring hasil pencarian sesuai kebijakan dan batasan usia pengguna</p>
                   <div className="grid grid-cols-[120px_1fr] items-center">
                      <span className="text-sm text-gray-500">Aktifkan</span>
                      <div className="w-10 h-5 bg-[#222222] rounded-full p-0.5 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full translate-x-5"></div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DAFTAR ALAMAT */}
          {activeTab === 'daftar' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex justify-between items-center gap-4">
                <div className="relative flex-1 max-w-xl">
                  <input type="text" placeholder="Tulis Nama Alamat / Kota / Kecamatan tujuan pengiriman" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#A0D585] text-sm" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <Button className="bg-[#A0D585] hover:bg-[#8bc96d] text-[#222222] font-black uppercase tracking-widest text-xs px-6 py-6 rounded-xl shadow-none">+ Tambah Alamat Baru</Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="border-[#A0D585] text-[#A0D585] bg-[#A0D585]/10 hover:bg-[#A0D585]/20 hover:text-[#A0D585] font-bold rounded-xl h-10 px-6">Semua Alamat</Button>
                <Button variant="outline" className="border-gray-200 text-gray-500 hover:bg-gray-50 font-bold rounded-xl h-10 px-6">Dari Teman</Button>
              </div>

              {/* Active Address Card */}
              <div className="border-2 border-[#A0D585] bg-[#A0D585]/5 rounded-xl p-6 relative">
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#A0D585]">
                  <CheckCircle2 size={24} />
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-sm text-[#222222]">rumah</span>
                  <Badge className="bg-gray-200 text-gray-500 hover:bg-gray-200 text-[10px] font-bold shadow-none uppercase">Utama</Badge>
                </div>
                
                <h4 className="font-black text-lg text-[#222222] mb-1">{currentUser.fullName}</h4>
                <p className="text-sm text-[#222222] mb-1">{!currentUser.contact.includes('@') ? currentUser.contact : '081234567890'}</p>
                <p className="text-sm text-gray-600 mb-4 max-w-2xl">Jl. sumur jambu 1 no. 42 rt.10/05 kec. makasar kel. makasar jakarta timur</p>
                
                <div className="flex items-center gap-1.5 text-[#A0D585] font-bold text-sm mb-6 cursor-pointer">
                  <MapPin size={16} />
                  <span>Sudah Pinpoint</span>
                </div>
                
                <div className="flex gap-6">
                  <button className="text-sm font-bold text-[#A0D585] hover:underline">Share</button>
                  <button className="text-sm font-bold text-[#A0D585] hover:underline">Ubah Alamat</button>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== 'biodata' && activeTab !== 'daftar' && (
            <div className="py-20 text-center text-gray-400">
              <p className="font-bold text-lg">Informasi {activeTab} akan segera hadir.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
