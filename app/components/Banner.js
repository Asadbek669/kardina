"use client";

import { useState, useEffect } from "react";

const banners = [
  "📢 Yangiliklar: Yangi chegirmalar va maxsulotlar uchun joy!",
  "📢 Yangiliklar: Yangi chegirmalar va maxsulotlar uchun joy!",
  "📢 Yangiliklar: Yangi chegirmalar va maxsulotlar uchun joy!"
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  // Auto slide har 4 soniyada
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-lg mb-8">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((text, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full"
          >
            <div className="w-full aspect-video bg-[#081537] flex items-center justify-center p-4">
              <p className="text-white text-center font-semibold text-lg sm:text-xl">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}