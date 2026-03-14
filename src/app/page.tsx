"use client";

import { useState } from "react";
import { Login } from "@/components/auth/Login";
import { Register } from "@/components/auth/Register";
import { Dashboard } from "@/components/ecommerce/Dashboard";

export default function Home() {
  const [view, setView] = useState<"login" | "register" | "dashboard">("login");

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center">
      {view === "login" && (
        <div className="w-full relative">
          <Login 
            onRegisterClick={() => setView("register")} 
            onLoginSuccess={() => setView("dashboard")} 
          />
        </div>
      )}
      
      {view === "register" && (
        <div className="w-full">
          <Register onLoginClick={() => setView("login")} />
        </div>
      )}
      
      {view === "dashboard" && (
        <div className="absolute inset-0">
          <Dashboard onLogout={() => setView("login")} />
        </div>
      )}
    </main>
  );
}
