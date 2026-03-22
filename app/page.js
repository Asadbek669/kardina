import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Slider from "./components/Slider";
import { products } from "./data";

export default function Home() {
  const limitedProducts = products.slice(0, 5);

  // CTA card qo‘shamiz
  const sliderData = [
    ...limitedProducts,
    { id: "more", isMore: true }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Banner />

		<div className="flex items-center justify-between mb-6">
		  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
			Maxsulotlar
		  </h2>

		  <a
		    href="/products"
		    className="text-sm bg-[#081537] text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
		  >
		    Barchasi
		  </a>
		</div>

        <div className="relative">
          <Slider products={sliderData} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
