"use client";

export default function ProductCard({ product }) {
  // Narx formatlash
  const formatPrice = (price) => {
    return price.toLocaleString("uz-UZ") + " so‘m";
  };

  // CTA CARD (Barcha mahsulotlar)
  if (product.isMore) {
    return (
      <a
        href="/products"
        className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group block"
      >
        {/* Upper Image + Gradient */}
        <div
          className="w-full aspect-square flex items-center justify-center text-white relative"
          style={{
            backgroundImage: `url("/images/512.png"), linear-gradient(to bottom right, #081537, #1e3a8a)`,
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center z-10">
            <div className="text-5xl mb-2 group-hover:translate-x-1 transition-transform">
              ➜
            </div>
            <p className="text-sm opacity-80 truncate">
              Yana ko‘p mahsulotlar
            </p>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            Barcha mahsulotlar
          </h2>

          <p className="text-sm text-gray-500 mt-1 truncate">
            Yana ko‘plab mahsulotlarni ko‘rish uchun bosing
          </p>

          <p className="mt-2 text-blue-600 font-bold text-lg">→</p>

          <div className="mt-4 w-full bg-[#081537] text-white py-2 rounded-xl text-center hover:bg-blue-700 transition">
            Ko‘rish
          </div>
        </div>
      </a>
    );
  }

  // ODDIY PRODUCT CARD
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group">
      
      {/* Image */}
      <div className="w-full aspect-square overflow-hidden relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Category */}
        <span className="absolute top-3 left-3 bg-[#081537] text-white text-xs px-3 py-1 rounded-full shadow">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h2>

        {/* 1 QATOR DESCRIPTION */}
        <p className="text-sm text-gray-500 mt-1 truncate">
          {product.description}
        </p>

        {/* Price */}
        <p className="mt-2 text-blue-600 font-bold text-lg">
          {formatPrice(product.price)}
        </p>

        {/* Button */}
        <button className="mt-4 w-full bg-[#081537] text-white py-2 rounded-xl hover:bg-blue-700 active:scale-95 transition-transform">
          🛒 Savatga
        </button>
      </div>
    </div>
  );
}