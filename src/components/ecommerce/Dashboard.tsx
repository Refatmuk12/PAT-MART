"use client";

import { useState } from "react";
import { useCartStore, Product } from "@/store/cart";
import { Search, ShoppingCart, Bell, User, MapPin, Star, Rocket, Plus, Minus, HeartHandshake, X, CreditCard, Wallet, Banknote, Truck, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Mock Tokopedia/Pop Mart Products
const products = [
  { id: "1", name: "MEGA SPACE MOLLY 1000% Patrick Star", price: 1250.00, image: "🌟", store: "Pop Mart Official", rating: 4.9, sold: 124 },
  { id: "2", name: "DIMOO Retro Series Blind Box", price: 15.50, image: "👾", store: "Toys Kingdom", rating: 4.8, sold: 2150 },
  { id: "3", name: "Hirono City of Mercy Series", price: 16.00, image: "🏙️", store: "Pop Mart Official", rating: 5.0, sold: 840 },
  { id: "4", name: "SKULLPANDA The Mare of Animals", price: 18.00, image: "🦄", store: "Collectopia", rating: 4.7, sold: 432 },
  { id: "5", name: "KUBO Walks of Life Series", price: 15.50, image: "🚶", store: "Pop Mart Official", rating: 4.9, sold: 955 },
  { id: "6", name: "Sweet Bean x Glico Pocky Series", price: 14.00, image: "🍫", store: "Sweet Treats ID", rating: 4.6, sold: 310 },
  { id: "7", name: "CRYBABY Sad Club Series", price: 17.50, image: "💧", store: "Pop Mart Official", rating: 4.9, sold: 1620 },
  { id: "8", name: "Zsiga We're So Cute Series", price: 15.00, image: "🐾", store: "Toys Kingdom", rating: 4.8, sold: 540 },
];

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { items, addItem, decrementItem, isZakatEnabled, toggleZakat, isCartOpen, toggleCart, getTotals, clearCart } = useCartStore();
  const [isAntiGravity, setIsAntiGravity] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("qris");

  // Calculate total cart items badge
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const triggerZap = () => {
    setIsAntiGravity(true);
    setTimeout(() => setIsAntiGravity(false), 5000); // Auto reset after 5s
  };

  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    setModalQuantity(1);
    setIsModalOpen(true);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      for (let i = 0; i < modalQuantity; i++) {
        addItem(selectedProduct);
      }
      setIsModalOpen(false);
    }
  };

  const handleBuyNow = () => {
    if (selectedProduct) {
      // Simulate quick checkout
      const total = selectedProduct.price * modalQuantity;
      const zakat = isZakatEnabled ? total * 0.025 : 0;
      alert(`Beli Langsung Berhasil!\nTotal: $${(total + zakat).toFixed(2)}${isZakatEnabled ? ` (Termasuk Sadaqah $${zakat.toFixed(2)})` : ''}`);
      setIsModalOpen(false);
    }
  };

  const handleCheckout = () => {
    const { total } = getTotals();
    alert(`Pesanan Berhasil Dibuat!\nTotal Pembayaran: $${total.toFixed(2)}\nMetode Pembayaran: ${paymentMethod.toUpperCase()}`);
    clearCart();
    toggleCart();
  };

  return (
    <div className={`min-h-screen w-full bg-[#f3f4f5] font-['Helvetica'] transition-all duration-1000 ${isAntiGravity || isCartOpen ? 'overflow-hidden h-screen' : ''}`}>
      
      {/* Tokopedia-Style Navbar */}
      <nav className={`sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm transition-transform duration-1000 ${isAntiGravity ? 'translate-z-10 rotate-y-[-2deg] translate-y-[-10px]' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
            <div className="w-8 h-8 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-xl font-black italic">P</span>
            </div>
            <span className="text-2xl font-black text-[#FF0000] tracking-tighter uppercase italic hidden md:block">PAT MART</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <input 
              type="text" 
              placeholder="Cari art toys, koleksi, atau kreator..." 
              className="w-full pl-4 pr-10 py-2.5 bg-white border-2 border-gray-100 rounded-xl outline-none focus:border-[#FF0000] transition-colors text-sm font-medium"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#FF0000] p-1.5 rounded-lg text-white">
              <Search size={16} strokeWidth={3} />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-6 ml-4">
             {/* Anti-Gravity Zap Trigger */}
             <button 
                onClick={triggerZap}
                className={`relative p-2 rounded-xl transition-all ${isAntiGravity ? 'bg-[#FF0000] text-white animate-pulse' : 'text-gray-400 hover:bg-red-50 hover:text-[#FF0000]'}`}
                title="Google Anti-Gravity"
              >
                <Rocket size={22} className={isAntiGravity ? 'animate-bounce' : ''} />
              </button>

            <div className="relative text-gray-500 hover:text-[#FF0000] cursor-pointer transition-colors hidden sm:block">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 bg-[#FF0000] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">3</span>
            </div>
            <div className="relative text-gray-500 hover:text-[#FF0000] cursor-pointer transition-colors" onClick={toggleCart}>
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF0000] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </div>
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1.5 rounded-xl transition-colors">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[#222222] group-hover:bg-[#FF0000] group-hover:text-white transition-colors">
                <User size={18} />
              </div>
              <span onClick={onLogout} className="text-sm font-bold text-gray-600 group-hover:text-[#FF0000] hidden md:block">Keluar</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Banner Section */}
        <div className={`w-full bg-[#222222] rounded-3xl p-8 mb-8 text-white relative overflow-hidden flex items-center shadow-xl transition-transform duration-1000 ${isAntiGravity ? 'rotate-y-12 translate-z-[-20px] scale-95 origin-left' : ''}`}>
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF0000] rounded-full blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
           <div className="z-10 max-w-lg">
             <Badge className="bg-[#A0D585] text-[#222222] hover:bg-[#A0D585] font-black uppercase tracking-widest text-[10px] px-2 py-1 mb-4 rounded-md">Exclusive Release</Badge>
             <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-3">MEGA SPACE MOLLY<br/>1000% Patrick Star</h2>
             <p className="text-gray-300 font-medium mb-6">Nikmati pengalaman belanja art toys tercepat dengan fitur 3D Anti-Gravity eksklusif.</p>
             <Button className="bg-[#FF0000] text-white font-black uppercase tracking-tighter hover:bg-white hover:text-[#FF0000] transition-colors px-8 py-6 rounded-2xl text-lg shadow-lg shadow-[#FF0000]/30 transform active:scale-95">
               Beli Sekarang
             </Button>
           </div>
           <div className="hidden md:block absolute right-10 bottom-0 text-[12rem] leading-none opacity-20 filter drop-shadow-2xl translate-y-8">🌟</div>
        </div>

        {/* Product Grid */}
        <h3 className="text-2xl font-black text-[#222222] uppercase tracking-tighter italic mb-6">Spesial Untukmu</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-20">
          {products.map((product, index) => (
            <div 
              key={product.id}
              onClick={() => openProductModal(product)}
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group
                ${isAntiGravity ? 'animate-float opacity-90' : ''}`}
              style={isAntiGravity ? { animationDelay: `${index * 0.2}s`, animationDuration: `${3 + (index % 3)}s` } : {}}
            >
              {/* Product Image Area */}
              <div className="h-48 bg-gray-50 flex items-center justify-center text-7xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[#222222] opacity-0 group-hover:opacity-5 transition-opacity"></div>
                <span className="transform group-hover:scale-110 transition-transform duration-500">{product.image}</span>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h4 className="font-bold text-sm text-[#222222] line-clamp-2 leading-tight mb-2 group-hover:text-[#FF0000] transition-colors">{product.name}</h4>
                <div className="text-lg font-black text-[#222222] mb-3">${product.price.toFixed(2)}</div>
                
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin size={12} className="mr-1 text-[#A0D585]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{product.store}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-[#222222]">
                    <Star size={12} fill="#FF0000" className="text-[#FF0000] mr-1" />
                    <span className="text-xs font-bold">{product.rating}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="text-[10px] font-bold text-gray-400">Terjual {product.sold > 1000 ? `${(product.sold/1000).toFixed(1)}rb+` : product.sold}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Product Details Modal (PDP) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white border-none rounded-3xl shadow-2xl">
          {selectedProduct && (
            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
              {/* Left Side - Gallery */}
              <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-8 relative">
                <div className="text-[10rem] filter drop-shadow-xl z-10 animate-in zoom-in-50 duration-500">
                  {selectedProduct.image}
                </div>
                {/* Background Decor */}
                <div className="absolute w-64 h-64 bg-white rounded-full opacity-50 shadow-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>

              {/* Right Side - Details & Action */}
              <div className="w-full md:w-1/2 p-8 flex flex-col pt-12 md:pt-8 bg-white">
                <DialogHeader className="text-left mb-6">
                  <Badge className="w-fit bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000]/20 font-black uppercase tracking-widest text-[10px] shadow-none mb-3">Terlaris</Badge>
                  <DialogTitle className="text-2xl font-black text-[#222222] leading-tight">{selectedProduct.name}</DialogTitle>
                  <div className="text-3xl font-black text-[#222222] mt-4">${selectedProduct.price.toFixed(2)}</div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pr-2 pb-6">
                  <h5 className="font-bold text-sm text-[#222222] uppercase tracking-widest mb-2 border-b-2 border-black inline-block pb-1">Detail Produk</h5>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    Mainan eksklusif dari lini Pop Mart. Kondisi baru, tersegel, dan 100% original. 
                    Barang sangat dicari dan cocok untuk melengkapi koleksi Anda. Hati-hati barang tiruan, kami hanya menjual Official Product.
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6 mt-auto">
                  
                  {/* Quantity Controller & Subtotal */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center border-2 border-gray-200 rounded-xl p-1 bg-white">
                      <button 
                        onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                        className="p-2 text-gray-400 hover:text-[#FF0000] transition-colors"
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      <span className="w-10 text-center font-black text-[#222222]">{modalQuantity}</span>
                      <button 
                        onClick={() => setModalQuantity(modalQuantity + 1)}
                        className="p-2 text-[#FF0000] transition-colors"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Subtotal</div>
                      <div className="text-xl font-black text-[#222222]">${(selectedProduct.price * modalQuantity).toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Zakat/Sadaqah Checkout Option */}
                  <div 
                    className="flex justify-between items-center text-sm p-4 rounded-2xl bg-[#A0D585]/10 border border-[#A0D585]/20 cursor-pointer mb-6 hover:bg-[#A0D585]/20 transition-all group"
                    onClick={toggleZakat}
                  >
                    <div className="flex items-center text-[#222222] font-bold">
                      <HeartHandshake size={18} className="mr-3 text-[#A0D585] group-hover:scale-110 transition-transform" />
                      Infaq / Sadaqah (+2.5%)
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${isZakatEnabled ? 'bg-[#A0D585]' : 'bg-gray-300'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isZakatEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={handleAddToCart}
                      className="flex-1 py-7 rounded-2xl border-2 border-[#222222] text-[#222222] font-black uppercase tracking-tighter hover:bg-[#222222] hover:text-white transition-all transform active:scale-95"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" /> Keranjang
                    </Button>
                    <Button 
                      onClick={handleBuyNow}
                      className="flex-1 py-7 rounded-2xl bg-[#FF0000] text-white font-black uppercase tracking-tighter hover:bg-[#222222] shadow-xl shadow-[#FF0000]/20 transition-all transform active:scale-95"
                    >
                      Beli Langsung
                    </Button>
                  </div>

                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    {/* Cart & Checkout Sidebar */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm animate-in fade-in" onClick={toggleCart}></div>
          <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <h2 className="text-xl font-black text-[#222222] tracking-tighter uppercase italic flex items-center">
                <ShoppingCart className="mr-2" /> Keranjang Belanja
              </h2>
              <button onClick={toggleCart} className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-[#FF0000] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50">
              {/* Delivery Address */}
              <div className="p-6 bg-white mb-2">
                <h3 className="text-sm font-bold text-[#222222] mb-3 flex items-center"><MapPin size={16} className="mr-2 text-[#FF0000]" /> Alamat Pengiriman</h3>
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm text-[#222222]">Refat Mukmin <Badge className="ml-2 bg-[#A0D585]/20 text-[#222222] hover:bg-[#A0D585]/20 text-[10px]">Utama</Badge></span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">Jl. Jend. Sudirman Kav. 52-53, Kebayoran Baru, Jakarta Selatan, 12190 (Gedung PAT MART Tower lantai 12)</p>
                  <p className="text-xs text-gray-500 mt-1 font-medium">0812-3456-7890</p>
                  <Button variant="outline" className="w-full mt-3 h-8 text-xs font-bold">Ubah Alamat</Button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="p-6 bg-white mb-2">
                <h3 className="text-sm font-bold text-[#222222] mb-4">Pesanan ({cartItemCount} Barang)</h3>
                
                {items.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="font-medium">Keranjang masih kosong nih.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-4 p-3 border border-gray-100 rounded-xl">
                        <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center text-4xl">{item.image}</div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-sm text-[#222222] line-clamp-1">{item.name}</h4>
                            <div className="text-[#FF0000] font-black">${item.price.toFixed(2)}</div>
                          </div>
                          <div className="flex items-center justify-end border border-gray-200 rounded-lg w-fit ml-auto">
                            <button onClick={() => decrementItem(item.id)} className="px-2 py-1 text-gray-500 hover:text-[#FF0000]"><Minus size={14} /></button>
                            <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                            <button onClick={() => addItem(item)} className="px-2 py-1 text-gray-500 hover:text-[#A0D585]"><Plus size={14} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="p-6 bg-white">
                <h3 className="text-sm font-bold text-[#222222] mb-3 flex items-center"><Wallet size={16} className="mr-2 text-[#FF0000]" /> Metode Pembayaran</h3>
                <div className="grid gap-3">
                  <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'qris' ? 'border-[#FF0000] bg-red-50' : 'border-gray-100 hover:border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                      <QrCode className={paymentMethod === 'qris' ? 'text-[#FF0000]' : 'text-gray-400'} />
                      <span className="font-bold text-sm text-[#222222]">QRIS (E-Wallet)</span>
                    </div>
                    <input type="radio" name="payment" value="qris" checked={paymentMethod === 'qris'} onChange={() => setPaymentMethod('qris')} className="accent-[#FF0000] w-4 h-4" />
                  </label>
                  
                  <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-[#FF0000] bg-red-50' : 'border-gray-100 hover:border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                      <CreditCard className={paymentMethod === 'transfer' ? 'text-[#FF0000]' : 'text-gray-400'} />
                      <span className="font-bold text-sm text-[#222222]">Transfer Bank (Virtual Account)</span>
                    </div>
                    <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="accent-[#FF0000] w-4 h-4" />
                  </label>

                  <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#FF0000] bg-red-50' : 'border-gray-100 hover:border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                      <Banknote className={paymentMethod === 'cod' ? 'text-[#FF0000]' : 'text-gray-400'} />
                      <span className="font-bold text-sm text-[#222222]">Cash on Delivery (COD)</span>
                    </div>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-[#FF0000] w-4 h-4" />
                  </label>
                </div>
              </div>
            </div>

            {/* Checkout Footer */}
            <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
              {/* Ethics Toggle inside Cart too */}
              <div 
                className="flex justify-between items-center text-xs p-3 rounded-xl bg-[#A0D585]/10 border border-[#A0D585]/20 cursor-pointer mb-4 hover:bg-[#A0D585]/20 transition-all group"
                onClick={toggleZakat}
              >
                <div className="flex items-center text-[#222222] font-bold">
                  <HeartHandshake size={14} className="mr-2 text-[#A0D585]" />
                  Bulatkan untuk Sadaqah
                </div>
                <div className={`w-8 h-4 rounded-full transition-colors flex items-center px-0.5 ${isZakatEnabled ? 'bg-[#A0D585]' : 'bg-gray-300'}`}>
                  <div className={`w-3 h-3 rounded-full bg-white transition-transform ${isZakatEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>

              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Total Tagihan</span>
                  <div className="flex flex-col">
                    {isZakatEnabled && <span className="text-xs text-gray-400 line-through">${getTotals().subtotal.toFixed(2)}</span>}
                    <span className="text-2xl font-black text-[#FF0000]">${getTotals().total.toFixed(2)}</span>
                  </div>
                </div>
                <Button 
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  className="bg-[#222222] text-white px-8 py-6 rounded-2xl font-black uppercase tracking-tighter hover:bg-[#FF0000] transition-colors shadow-xl"
                >
                  Bayar
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
