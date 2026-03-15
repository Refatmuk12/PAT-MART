"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ShoppingCart, Rocket, Trash2, Plus, Minus, CreditCard, HeartHandshake } from "lucide-react";

// Mock Products
const products = [
  { id: "1", name: "Safiya Dates Premium", price: 15.00, image: "🛒", halal: true },
  { id: "2", name: "Zamzam Water 500ml", price: 5.50, image: "💧", halal: true },
  { id: "3", name: "Pop Mart Dimoo Space", price: 25.00, image: "🚀", halal: true },
  { id: "4", name: "Skullpanda Series", price: 28.00, image: "🐼", halal: true },
  { id: "5", name: "Habbatus Sauda Oil", price: 12.00, image: "🌿", halal: true },
  { id: "6", name: "Siwak Natural Toothbrush", price: 3.50, image: "🪥", halal: true },
  { id: "7", name: "Molly Anniversary", price: 30.00, image: "👑", halal: true },
  { id: "8", name: "Gourmet Honey Set", price: 45.00, image: "🍯", halal: true },
  { id: "9", name: "Oud Air Freshener", price: 18.00, image: "✨", halal: true },
];

export function POSInput({ onLogout }: { onLogout: () => void }) {
  const { items, isZakatEnabled, addItem, removeItem, decrementItem, toggleZakat, getTotals, clearCart } = useCartStore();
  const [isAntiGravity, setIsAntiGravity] = useState(false);
  const { subtotal, zakat, total } = getTotals();

  // Trigger Anti-Gravity mode
  const triggerZap = () => {
    setIsAntiGravity(true);
    setTimeout(() => setIsAntiGravity(false), 5000); // Reset after 5 seconds
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    alert(`Transaction successful! Total: $${total.toFixed(2)}${isZakatEnabled ? ` (Includes $${zakat.toFixed(2)} Sadaqah/Zakat)` : ''}`);
    clearCart();
  };

  return (
    <div className={`flex h-screen w-full bg-background overflow-hidden transition-all duration-1000 ${isAntiGravity ? 'perspective-1000' : ''}`}>
      
      {/* Left Sidebar - Cart / Receipt (Odoo Style) */}
      <div className={`w-1/3 flex flex-col border-r border-border bg-card shadow-lg z-10 transition-transform duration-1000 ${isAntiGravity ? 'rotate-y-12 translate-z-10' : ''}`}>
        
        {/* Header */}
        <div className="p-4 bg-secondary text-secondary-foreground flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} />
            <h2 className="text-xl font-bold tracking-tight">Current Order</h2>
          </div>
          <Badge className="bg-accent text-accent-foreground border-none font-bold shadow-sm">
            <CheckCircle2 size={12} className="mr-1 inline" /> Sharia Verified
          </Badge>
        </div>

        {/* Cart Items Area */}
        <ScrollArea className="flex-1 p-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground pt-20">
              <ShoppingCart size={48} className="mb-4 opacity-20" />
              <p>Cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start animate-in slide-in-from-left-2 duration-200">
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                    <p className="text-muted-foreground text-xs">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="font-bold text-sm mr-2">${(item.price * item.quantity).toFixed(2)}</div>
                    <div className="flex bg-muted rounded-md p-1 items-center">
                      <button onClick={() => decrementItem(item.id)} className="p-1 hover:bg-background rounded text-foreground transition-colors"><Minus size={14} /></button>
                      <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => addItem(item)} className="p-1 hover:bg-background rounded text-foreground transition-colors"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Totals & Calculators */}
        <div className="p-4 bg-muted/30 border-t border-border mt-auto">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            {/* Zakat/Sadaqah Calculator Toggle */}
            <div className="flex justify-between items-center text-sm py-2 px-3 rounded-lg bg-accent/10 border border-accent/20 cursor-pointer hover:bg-accent/20 transition-colors" onClick={toggleZakat}>
              <div className="flex items-center text-foreground font-medium">
                <HeartHandshake size={16} className="mr-2 text-accent" />
                Add Zakat/Sadaqah (2.5%)
              </div>
              <div className="flex items-center">
                <span className="font-bold text-accent mr-3">+${zakat.toFixed(2)}</span>
                <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${isZakatEnabled ? 'bg-accent' : 'bg-muted-foreground/30'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isZakatEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>
            
            <Separator className="my-2" />
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <Button 
            className="w-full h-16 text-xl font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 transition-all active:scale-95 disabled:opacity-50"
            disabled={items.length === 0}
            onClick={handleCheckout}
          >
            <CreditCard className="mr-2 h-6 w-6" /> PAY ${total.toFixed(2)}
          </Button>
        </div>
      </div>

      {/* Right Area - Product Grid */}
      <div className={`w-2/3 flex flex-col p-6 transition-transform duration-1000 ${isAntiGravity ? '-rotate-y-10 -translate-z-50 -translate-y-20' : ''}`}>
        
        {/* Header Tools */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-black text-secondary tracking-tight">Products</h1>
          
          <div className="flex gap-3">
            {/* Zap/Rocket Button for Anti-Gravity */}
            <Button 
              variant="outline" 
              className={`border-primary text-primary hover:bg-primary hover:text-white transition-all 
                ${isAntiGravity ? 'animate-pulse bg-primary !text-white' : ''}`}
              onClick={triggerZap}
            >
              <Rocket className={`mr-2 h-4 w-4 ${isAntiGravity ? 'animate-bounce' : ''}`} /> 
              {isAntiGravity ? 'GRAVITY OFF' : 'ZAP!'}
            </Button>
            
            <Button variant="ghost" onClick={onLogout} className="text-muted-foreground hover:text-destructive">
              Logout
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <ScrollArea className="flex-1 pr-4 pb-4">
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className={`cursor-pointer hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden group
                  ${isAntiGravity ? 'animate-float opacity-90' : ''}`}
                style={isAntiGravity ? { animationDelay: `${Math.random() * 2}s`, animationDuration: `${3 + Math.random() * 2}s` } : {}}
                onClick={() => addItem(product as any)}
              >
                <CardContent className="p-0 flex justify-center items-center h-40 bg-muted/30 text-6xl group-hover:scale-110 transition-transform relative">
                  {product.image}
                  {product.halal && (
                    <Badge className="absolute top-2 right-2 bg-accent/90 text-accent-foreground border-none text-[10px] px-1.5 font-bold uppercase tracking-wider">
                      Halal
                    </Badge>
                  )}
                </CardContent>
                <CardFooter className="p-3 flex flex-col items-start bg-card border-t border-border">
                  <h3 className="font-bold text-sm text-foreground truncate w-full">{product.name}</h3>
                  <p className="text-muted-foreground font-medium text-primary mt-1">${product.price.toFixed(2)}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

    </div>
  );
}
