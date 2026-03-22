"use client";

import { Send, Instagram, ShoppingCart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#081537] text-white py-6 px-4">

      {/* Icons */}
      <div className="flex justify-center items-center gap-6 mb-4">
        
        <a
          href="https://t.me/yourchannel"
          target="_blank"
          className="hover:text-yellow-400 transition"
        >
          <Send size={28} />
        </a>

        <a
          href="https://instagram.com/yourprofile"
          target="_blank"
          className="hover:text-yellow-400 transition"
        >
          <Instagram size={28} />
        </a>

        <a
          href="/products"
          className="hover:text-yellow-400 transition"
        >
          <ShoppingCart size={28} />
        </a>

      </div>

      {/* Phone */}
      <p className="text-center text-sm mb-2">
        📞 +998 90 123 45 67
      </p>

      {/* Copyright */}
      <p className="text-center text-xs opacity-70">
        © 2026 Kardina Shop
      </p>
    </footer>
  );
}