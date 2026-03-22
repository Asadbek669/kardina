"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  // Brauzer xotirasidan savatni o'qish
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  // Savat o'zgarganda localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Miqdorni + / − bilan o'zgartirish
  const handleQuantityChange = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Jami narx hisoblash
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price) => price.toLocaleString("uz-UZ") + " so‘m";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">🛒 Savat</h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-4xl mb-4">😢</p>
            <p>Savat hozircha bo‘sh</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 rounded-2xl shadow p-4"
              >
                {/* Mahsulot rasmi */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                {/* Mahsulot tafsiloti */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-blue-600 font-bold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center border rounded-xl overflow-hidden">
                  <button
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    −
                  </button>
                  <span className="px-4 py-1">{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* Jami narx va checkout */}
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-2xl">
              <p className="text-xl font-bold">Jami: {formatPrice(totalPrice)}</p>
              <button className="mt-2 sm:mt-0 bg-[#081537] text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                Buyurtma berish
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}