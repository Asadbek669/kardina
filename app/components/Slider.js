// components/Slider.js
import ProductCard from "./ProductCard";

export default function Slider({ products }) {
  return (
    <div className="overflow-x-auto py-4 px-2">
      <div className="flex gap-4 sm:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 transition-transform duration-300 hover:scale-105"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}