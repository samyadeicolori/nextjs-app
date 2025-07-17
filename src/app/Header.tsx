"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import { getSiteInfo } from "./wordpress-site";

export default function Header() {
  const [siteTitle, setSiteTitle] = useState<string | null>(null);

  useEffect(() => {
    getSiteInfo().then((info) => {
      if (info && typeof info === "object" && "name" in info && typeof info.name === "string") {
        setSiteTitle(info.name);
      }
    });
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 py-6 px-4 flex flex-col sm:flex-row items-center justify-between shadow-md">
      <Link href="/" className="flex items-center group">
        {siteTitle && (
          <span className="text-white text-2xl font-bold tracking-tight group-hover:underline">{siteTitle}</span>
        )}
      </Link>
      <Link href="/" className="flex items-center group">
        {siteTitle && (
          <span className="text-white text-2xl font-bold tracking-tight group-hover:underline">{siteTitle}</span>
        )}
      </Link>
      <nav className="mt-4 sm:mt-0 flex gap-6">
        <Link href="/" className="text-white font-medium hover:underline">Home</Link>
        <Link href="/articoli" className="text-white font-medium hover:underline">Blog</Link>
        <a href="#" className="text-white font-medium hover:underline">Contatti</a>
      </nav>
    </header>
  );
}
