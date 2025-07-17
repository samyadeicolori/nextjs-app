"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getSiteInfo, getSiteLogoUrl } from "./wordpress-site";

export default function Header() {
  const [siteTitle, setSiteTitle] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    getSiteInfo().then((info) => {
      if (info && typeof info === "object" && "name" in info && typeof info.name === "string") {
        setSiteTitle(info.name);
      }
    });
    getSiteLogoUrl().then((url) => {
      if (url) setLogoUrl(url);
    });
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 py-6 px-4 flex flex-col sm:flex-row items-center justify-between shadow-md">
      <a href="/" className="flex items-center group">
        {siteTitle && (
          <span className="text-white text-2xl font-bold tracking-tight group-hover:underline">{siteTitle}</span>
        )}
      </a>
      <nav className="mt-4 sm:mt-0 flex gap-6">
        <a href="/" className="text-white font-medium hover:underline">Home</a>
        <a href="/articoli" className="text-white font-medium hover:underline">Blog</a>
        <a href="#" className="text-white font-medium hover:underline">Contatti</a>
      </nav>
    </header>
  );
}
