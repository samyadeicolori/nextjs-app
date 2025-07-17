"use client";

import Header from "../Header";
import { useEffect, useState } from "react";
import { getLatestPosts } from "../wordpress";
import Link from "next/link";

type Post = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  link?: string;
  content?: { rendered: string };
};

export default function Articoli() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestPosts().then((data) => {
      setPosts(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-cyan-700">Tutti gli articoli</h1>
        {loading ? (
          <p className="text-gray-500">Caricamento in corso...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">Nessun articolo trovato.</p>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow p-6 flex flex-col hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-bold mb-2 text-black" dangerouslySetInnerHTML={{ __html: post.title?.rendered || post.title }} />
                {post.excerpt?.rendered && (
                  <div className="text-gray-700 text-base mb-4" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                )}
                <Link href={`/articoli/${post.slug}`} className="mt-auto text-cyan-600 font-semibold hover:underline">Leggi tutto</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
