"use client";

import { useRouter } from "next/navigation";
import ProductCard from "../components/ProductCard";
import { products } from "../data";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProductsPage() {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6 text-center">
          Barcha Maxsulotlar
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleClick(product.id)}
              className="cursor-pointer"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
