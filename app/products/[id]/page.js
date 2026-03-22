"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "next/navigation";
import { products } from "../../data";
import Link from "next/link";

export default function ProductDetail() {
  const params = useParams();
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false); // savatga qo‘shilganmi
  const [cart, setCart] = useState([]);
  const [showButtons, setShowButtons] = useState(false); // pastdagi tugmalarni ko‘rsatish

  useEffect(() => {
    // LocalStorage dan savatni yuklash
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    const inCart = savedCart.find((item) => item.id === productId);
    if (inCart) {
      setQuantity(inCart.quantity);
      setAdded(true);
      setShowButtons(true);
    }
  }, [productId]);

  useEffect(() => {
    // savat state o‘zgarganda LocalStorage ga saqlash
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-3xl mx-auto py-10 px-4 text-center">
          <h2 className="text-2xl font-bold">Mahsulot topilmadi</h2>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price) =>
    (price * quantity).toLocaleString("uz-UZ") + " so‘m";

  const handleAddToCart = () => {
    const exists = cart.find((item) => item.id === product.id);
    let newCart;
    if (exists) {
      newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity }];
    }
    setCart(newCart);
    setAdded(true);
    setShowButtons(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="max-w-3xl mx-auto flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Mahsulot rasmi */}
          <div className="md:w-1/2 w-full">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>

          {/* Mahsulot tafsiloti */}
          <div className="md:w-1/2 w-full flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-xl font-bold text-[#081537] mb-4">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Savatga qo‘shish va + / − */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center border rounded-xl overflow-hidden">
                  <button
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                  >
                    −
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>

                <p className="font-bold text-[#081537] text-lg mb-0">
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Faqat qo‘shilmagan bo‘lsa savatga qo‘shish */}
              {!added ? (
                <button
                  className="w-full bg-[#081537] text-white py-3 rounded-xl hover:bg-blue-700 transition"
                  onClick={handleAddToCart}
                >
                  🛒 Savatga qo‘shish
                </button>
              ) : (
                <>
                  {/* Bildirishnoma */}
                  <div className="text-green-600 font-semibold text-center mb-2">
                    ✅ Savatga qo‘shildi!
                  </div>

                  {/* Pastdagi tugmalar */}
                  {showButtons && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        href="/products"
                        className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-xl text-center hover:bg-gray-300 transition"
                      >
                        ➡ Davom ettirish
                      </Link>
                      <Link
                        href="/cart"
                        className="flex-1 bg-[#081537] text-white py-3 rounded-xl text-center hover:bg-blue-700 transition"
                      >
                        🛒 Savatga o‘tish
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}