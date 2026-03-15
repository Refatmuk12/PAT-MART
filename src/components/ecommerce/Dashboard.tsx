"use client";

import { useState } from "react";
import { useCartStore, Product } from "@/store/cart";
import { Search, ShoppingCart, Bell, User, MapPin, Star, Rocket, Plus, Minus, HeartHandshake, X, CreditCard, Wallet, Banknote, Truck, QrCode, Clock, CheckCircle2, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useEffect } from "react";

// Expanded Tokopedia/Pop Mart Products Catalog
const products = [
  { id: "1", name: "MEGA SPACE MOLLY 1000% Patrick Star", price: 1250.00, image: "🌟", store: "Pop Mart Official", rating: 4.9, sold: 124 },
  { id: "2", name: "DIMOO Retro Series Blind Box", price: 15.50, image: "👾", store: "Toys Kingdom", rating: 4.8, sold: 2150 },
  { id: "3", name: "Hirono City of Mercy Series", price: 16.00, image: "🏙️", store: "Pop Mart Official", rating: 5.0, sold: 840 },
  { id: "4", name: "SKULLPANDA The Mare of Animals", price: 18.00, image: "🦄", store: "Collectopia", rating: 4.7, sold: 432 },
  { id: "5", name: "KUBO Walks of Life Series", price: 15.50, image: "🚶", store: "Pop Mart Official", rating: 4.9, sold: 955 },
  { id: "6", name: "Sweet Bean x Glico Pocky Series", price: 14.00, image: "🍫", store: "Sweet Treats ID", rating: 4.6, sold: 310 },
  { id: "7", name: "CRYBABY Sad Club Series", price: 17.50, image: "💧", store: "Pop Mart Official", rating: 4.9, sold: 1620 },
  { id: "8", name: "Zsiga We're So Cute Series", price: 15.00, image: "🐾", store: "Toys Kingdom", rating: 4.8, sold: 540 },
  // New Additions
  { id: "9", name: "Hirono × Chucky Figurine", price: 149.99, image: "🔪", store: "Pop Mart Official", rating: 5.0, sold: 610 },
  { id: "10", name: "KUBO The Joker Figurine", price: 129.99, image: "🃏", store: "Collectopia", rating: 4.9, sold: 320 },
  { id: "11", name: "CRYBABY Cheer Up, Baby! Series", price: 16.99, image: "🎀", store: "Pop Mart Official", rating: 4.8, sold: 2040 },
  { id: "12", name: "Hirono Road Journal Series-Plush Doll", price: 36.99, image: "🧸", store: "Pop Mart Official", rating: 4.7, sold: 890 },
];

export function Dashboard({ onLogout, onProfileClick }: { onLogout: () => void, onProfileClick: () => void }) {
  const { items, addItem, decrementItem, isZakatEnabled, toggleZakat, isCartOpen, toggleCart, getTotals, clearCart, notifications, addNotification, markNotificationsAsRead } = useCartStore();
  const [isAntiGravity, setIsAntiGravity] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("qris");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortBy, setSortBy] = useState("recommend"); // 'recommend', 'price_asc', 'price_desc', 'rating', 'sold'

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{method: string; amount: number; isDirect: boolean; directProduct?: any}>({method: 'qris', amount: 0, isDirect: false});
  const [vaTimer, setVaTimer] = useState(180);
  const [selectedBank, setSelectedBank] = useState("BCA");
  const [vaNumber, setVaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  // Timer effect for VA
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCheckoutOpen && checkoutData.method === 'transfer' && !isProcessing && vaTimer > 0) {
      interval = setInterval(() => setVaTimer((prev) => prev - 1), 1000);
    } else if (isCheckoutOpen && vaTimer === 0 && !isProcessing) {
      setIsCheckoutOpen(false);
      addNotification({ title: "Pembayaran Gagal", message: "Waktu pembayaran telah habis." });
    }
    return () => clearInterval(interval);
  }, [isCheckoutOpen, checkoutData.method, isProcessing, vaTimer, addNotification]);

  // Filter and Sort products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Semua" || product.name.includes(selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.store.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'sold') return b.sold - a.sold;
    return 0; // default/recommend
  });

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

  const startCheckout = (method: string, amount: number, isDirect: boolean, directProduct?: any) => {
    setCheckoutData({ method, amount, isDirect, directProduct });
    setVaTimer(180);
    setVaNumber(Math.floor(100000000000 + Math.random() * 900000000000).toString());
    setIsCheckoutOpen(true);
    if (isCartOpen) toggleCart();
    if (isModalOpen) setIsModalOpen(false);
  };

  const handleBuyNow = () => {
    if (selectedProduct) {
      // Clear cart and add only this item to force direct checkout via cart sidebar
      clearCart();
      for (let i = 0; i < modalQuantity; i++) {
        addItem(selectedProduct);
      }
      setIsModalOpen(false);
      if (!isCartOpen) toggleCart();
    }
  };

  const handleCheckout = () => {
    const { total } = getTotals();
    startCheckout(paymentMethod, total, false);
  };

  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckoutOpen(false);
      
      const purchasedItems = checkoutData.isDirect ? [checkoutData.directProduct] : [...items];
      
      setReceiptData({
        orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase(),
        method: checkoutData.method.toUpperCase(),
        amount: checkoutData.amount,
        items: purchasedItems
      });
      setIsReceiptOpen(true);

      addNotification({
        title: "Pembayaran Berhasil!",
        message: `Pesanan Anda senilai $${checkoutData.amount.toFixed(2)} sedang diproses. Lacak resi di menu pesanan.`
      });
      
      if (!checkoutData.isDirect) {
        clearCart();
      }
    }, 1500);
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
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => { if(searchQuery.length > 0) setShowSuggestions(true); }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Cari art toys, koleksi, atau kreator..." 
              className="w-full pl-4 pr-10 py-2.5 bg-white border-2 border-gray-100 rounded-xl outline-none focus:border-[#FF0000] transition-colors text-sm font-medium"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#FF0000] p-1.5 rounded-lg text-white pointer-events-none">
              <Search size={16} strokeWidth={3} />
            </div>

            {/* Auto-complete dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0,4).map(p => (
                  <div 
                    key={p.id}
                    onClick={() => {
                      setSearchQuery(p.name);
                      setShowSuggestions(false);
                      setSelectedCategory("Semua");
                    }}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <Search size={14} className="text-gray-400 group-hover:text-[#FF0000]" />
                      <span className="text-sm font-bold text-[#222222]">{p.name}</span>
                    </div>
                    <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-200 shadow-none font-bold uppercase tracking-widest text-[8px]">Produk</Badge>
                  </div>
                ))}
                {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                  <div className="px-4 py-6 text-center text-gray-400 text-sm font-medium">
                    Tidak ada hasil untuk "{searchQuery}"
                  </div>
                )}
              </div>
            )}
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

            <div className="relative hidden sm:block" onClick={() => { setShowNotifications(!showNotifications); markNotificationsAsRead(); }}>
              <div className="text-gray-500 hover:text-[#FF0000] cursor-pointer transition-colors">
                <Bell size={24} />
                {notifications.filter(n => n.isUnread).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF0000] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white animate-bounce">
                    {notifications.filter(n => n.isUnread).length}
                  </span>
                )}
              </div>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute top-full mt-6 right-0 w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h4 className="font-bold text-[#222222]">Notifikasi</h4>
                  </div>
                  <div className="max-h-80 overflow-y-auto cursor-default">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-500 text-sm">Belum ada notifikasi</div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${n.isUnread ? 'bg-red-50/10' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                            <h5 className="font-bold text-sm text-[#222222] line-clamp-1">{n.title}</h5>
                            <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap ml-2">{n.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2 mt-1">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
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
            <div className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1.5 rounded-xl transition-colors" onClick={onProfileClick}>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[#222222] group-hover:bg-[#FF0000] group-hover:text-white transition-colors border border-gray-200">
                <User size={18} />
              </div>
              <span className="text-sm font-bold text-gray-600 group-hover:text-[#FF0000] hidden md:block">Profil</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1.5 rounded-xl transition-colors" onClick={onLogout}>
              <span className="text-xs font-bold text-gray-400 group-hover:text-[#FF0000] hidden md:block uppercase tracking-widest">Keluar</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        
        {/* Left Sidebar - Categories */}
        <aside className="w-64 hidden lg:block shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-black text-[#222222] uppercase tracking-tighter italic mb-4">Kategori</h3>
            <div className="space-y-2">
              {["Semua", "MEGA SPACE MOLLY", "DIMOO", "Hirono", "SKULLPANDA", "KUBO", "CRYBABY"].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-colors ${selectedCategory === cat ? 'bg-[#FF0000] text-white' : 'hover:bg-gray-50 text-gray-500'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
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

        {/* Product Grid Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
             <h3 className="text-2xl font-black text-[#222222] uppercase tracking-tighter italic">Spesial Untukmu</h3>
             {searchQuery && <Badge className="bg-gray-100 text-[#222222] hover:bg-gray-200">"{searchQuery}"</Badge>}
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-gray-400" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-500 focus:outline-none cursor-pointer p-1"
            >
              <option value="recommend">Rekomendasi</option>
              <option value="price_asc">Harga Termurah</option>
              <option value="price_desc">Harga Termahal</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="sold">Produk Terjual</option>
            </select>
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-bold">Tidak ada produk yang sesuai dengan filter Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
            {filteredProducts.map((product, index) => (
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
        )}
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

      {/* Checkout Processing Modal */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-white border-none rounded-3xl shadow-2xl">
          <div className="p-6 bg-[#222222] text-white text-center">
            <h2 className="text-xl font-black italic uppercase tracking-tighter">Selesaikan Pembayaran</h2>
            <p className="text-gray-400 text-xs font-medium mt-1">Selesaikan dalam waktu yang ditentukan</p>
          </div>
          
          <div className="p-6 bg-gray-50">
            {checkoutData.method === 'qris' && (
              <div className="text-center space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 inline-block w-48 h-48 mx-auto shadow-sm relative overflow-hidden flex items-center justify-center group">
                  <div className="w-40 h-40 bg-gray-100/50 rounded flex items-center justify-center filter blur-[1px]">
                     <QrCode size={100} className="text-[#222222]" />
                  </div>
                  {/* Scanner line anim */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#FF0000] shadow-[0_0_10px_#FF0000] animate-[scan_2s_ease-in-out_infinite]"></div>
                </div>
                <div className="text-[#222222]">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total Tagihan</p>
                  <p className="text-3xl font-black text-[#FF0000]">${checkoutData.amount.toFixed(2)}</p>
                </div>
                <p className="text-xs text-gray-500">Buka aplikasi e-wallet Anda (GoPay, OVO, Dana, dll) lalu scan kode QR di atas.</p>
              </div>
            )}

            {checkoutData.method === 'transfer' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#FF0000]" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sisa Waktu</span>
                  </div>
                  <span className="text-lg font-black text-[#FF0000]">{Math.floor(vaTimer / 60)}:{String(vaTimer % 60).padStart(2, '0')}</span>
                </div>
                
                <div className="p-4 bg-white rounded-xl border border-gray-100 space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Pilih Bank</p>
                    <div className="grid grid-cols-4 gap-2">
                      {["BCA", "Mandiri", "BRI", "BSI"].map(bank => (
                        <button 
                          key={bank}
                          onClick={() => setSelectedBank(bank)}
                          className={`py-2 text-xs font-bold rounded-lg transition-colors border-2 ${selectedBank === bank ? 'border-[#FF0000] text-[#FF0000] bg-red-50' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Nomor Virtual Account</p>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <span className="font-medium text-[#222222] tracking-wider text-xl">{vaNumber}</span>
                      <Button variant="ghost" size="sm" className="text-[#FF0000] font-bold h-7 px-2" onClick={() => alert("Nomor VA disalin!")}>Salin</Button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total Penagihan</p>
                    <p className="text-2xl font-black text-[#222222]">${checkoutData.amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}

            {checkoutData.method === 'cod' && (
              <div className="text-center space-y-4 p-4 border border-[#FF0000]/20 bg-[#FF0000]/5 rounded-2xl">
                <Truck size={48} className="mx-auto text-[#FF0000] mb-2 drop-shadow-sm" />
                <div>
                  <h3 className="text-lg font-black text-[#222222] uppercase tracking-tighter italic">Cash On Delivery</h3>
                  <p className="text-sm text-gray-600 mt-2">Pastikan Anda ada di lokasi saat kurir tiba. Pembayaran sebesar <span className="font-bold text-[#FF0000]">${checkoutData.amount.toFixed(2)}</span> akan ditagihkan langsung.</p>
                </div>
                <div className="bg-white p-3 rounded-lg text-left shadow-sm border border-gray-100 text-xs">
                  <span className="font-bold text-[#222222] block mb-1">Alamat Pengiriman (Refat Mukmin)</span>
                  <span className="text-gray-500">Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            <Button 
              onClick={handlePaymentSuccess}
              disabled={isProcessing}
              className="w-full bg-[#222222] text-white py-6 rounded-2xl font-black uppercase tracking-tighter hover:bg-[#FF0000] transition-colors shadow-xl text-md flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Memproses...
                </>
              ) : checkoutData.method === 'cod' ? (
                <>
                  <CheckCircle2 className="mr-2" /> Konfirmasi Pesanan COD
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2" /> Simulasikan Berhasil
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipt Modal (Printable) */}
      <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
        <DialogContent className="sm:max-w-[400px] p-0 bg-transparent border-none shadow-none print:max-w-full print:shadow-none print:m-0 print:p-0">
          <div className="bg-[#f4f4f4] bg-[url('https://www.transparenttextures.com/patterns/crumpled-paper.png')] p-8 rounded-sm shadow-2xl mx-auto w-full max-w-[360px] relative font-mono text-[#222] min-h-[500px] print:w-full print:max-w-full print:min-h-screen print:rounded-none">
            
            {/* Print Only Styles */}
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                body * { visibility: hidden; }
                .print-section, .print-section * { visibility: visible; }
                .print-section { position: absolute; left: 0; top: 0; width: 100%; }
                .no-print { display: none !important; }
              }
            `}} />

            <div className="print-section">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-black tracking-widest leading-none mb-1">PAT MART</h1>
                <h2 className="text-lg font-bold tracking-[0.2em] mb-4">RECEIPTIFY</h2>
                <div className="text-xs font-bold uppercase tracking-widest">LAST MONTH</div>
              </div>

              {receiptData && (
                <>
                  <div className="text-[10px] uppercase mb-4 leading-tight font-bold">
                    <div>ORDER {receiptData.orderId} FOR {useCartStore.getState().currentUser?.fullName || 'GUEST'}</div>
                    <div>{receiptData.date}</div>
                  </div>

                  <div className="border-y-2 border-dashed border-[#222] py-2 mb-4">
                    <div className="flex justify-between text-[10px] font-bold mb-2 uppercase">
                      <span className="w-8">QTY</span>
                      <span className="flex-1">ITEM</span>
                      <span className="w-12 text-right">AMT</span>
                    </div>

                    {receiptData.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between text-[10px] font-bold mb-3 uppercase leading-tight">
                        <span className="w-8">{String(item.quantity || 1).padStart(2, '0')}</span>
                        <span className="flex-1 pr-2">{item.name}</span>
                        <span className="w-12 text-right">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-b-2 border-dashed border-[#222] pb-2 mb-4">
                    <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                      <span>ITEM COUNT:</span>
                      <span>{receiptData.items.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black uppercase">
                      <span>TOTAL:</span>
                      <span>${receiptData.amount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="text-[10px] font-bold uppercase leading-tight mb-6">
                    <div>CARD #: **** **** **** 2026</div>
                    <div>AUTH CODE: {Math.floor(100000 + Math.random() * 900000)}</div>
                    <div>CARDHOLDER: {useCartStore.getState().currentUser?.fullName || 'GUEST'}</div>
                  </div>

                  <div className="text-center">
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-4">THANK YOU FOR VISITING!</div>
                    {/* Mock Barcode */}
                    <div className="flex justify-center mb-1">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className={`h-12 bg-[#222] ${Math.random() > 0.5 ? 'w-1' : 'w-0.5'} mx-[0.5px]`}></div>
                      ))}
                    </div>
                    <div className="text-[8px] tracking-[0.3em] font-bold">patmart.com</div>
                  </div>
                </>
              )}
            </div>

            {/* Actions for Web View */}
            <div className="absolute -right-16 top-0 flex flex-col gap-2 no-print">
              <button onClick={() => setIsReceiptOpen(false)} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#222] hover:bg-gray-100 shadow-xl border border-gray-200"><X size={20} /></button>
              <button onClick={() => window.print()} className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center text-white hover:bg-[#FF0000] shadow-xl transition-colors"><Truck size={20} /></button>
            </div>
            {/* Hint text bottom absolute */}
            <div className="absolute -bottom-10 left-0 w-full text-center text-white text-xs font-bold no-print filter drop-shadow-md">
              Klik icon mobil untuk Cetak Resi
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
