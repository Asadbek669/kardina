"use client";
import { useState } from "react";

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg p-2 z-50">
          <a href="/" className="block px-3 py-2 hover:bg-gray-100 rounded">
            Bosh sahifa
          </a>
          <a href="/products" className="block px-3 py-2 hover:bg-gray-100 rounded">
            Mahsulotlar
          </a>
          <a href="/contact" className="block px-3 py-2 hover:bg-gray-100 rounded">
            Bog‘lanish
          </a>
        </div>
      )}
    </div>
  );
}