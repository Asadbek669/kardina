"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Menu from "./Menu";
import { ArrowLeft } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";

  return (
    <header className="bg-[#081537] shadow relative sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-2 px-4 flex items-center justify-between">

        {/* LEFT */}
        {isHome ? (
          <Link href="/" className="flex items-center">
            <img
              src="/images/192.png"
              alt="Logo"
              className="w-10 h-10 object-cover cursor-pointer"
            />
          </Link>
        ) : (
		  <button
		    onClick={() => router.back()}
		    className="text-white hover:scale-110 transition"
		  >
		    <ArrowLeft size={26} />
		  </button>
        )}

        {/* CENTER LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-10 object-cover cursor-pointer"
            />
          </Link>
        </div>

        {/* RIGHT MENU */}
        <Menu />

      </div>
    </header>
  );
}