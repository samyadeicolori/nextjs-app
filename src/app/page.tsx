"use client";

import Header from "./Header";
import { useState, useEffect } from "react";
import { getLatestPosts } from "./wordpress";
import Link from "next/link";



type Post = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  link?: string;
  content?: { rendered: string };
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getLatestPosts().then((data) => {
      setPosts(Array.isArray(data) ? data : []);
    });
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title?.rendered?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col items-center mt-10 px-4">
        <form className="w-full max-w-lg mb-8">
          <input
            type="text"
            placeholder="Cerca tra gli articoli..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
          />
        </form>
        <div className="w-full max-w-6xl overflow-x-auto touch-pan-x" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div
            className="flex gap-8 whitespace-nowrap min-w-max"
            style={{ animation: 'scroll-x 30s linear infinite', animationPlayState: 'running' }}
            onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
            onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
          >
            {filteredPosts.length === 0 ? (
              <p className="text-gray-500">Nessun articolo trovato.</p>
            ) : (
              [...filteredPosts, ...filteredPosts].map((post, idx) => (
                <div
                  key={post.id + '-' + idx}
                  className="bg-white rounded-xl shadow p-6 flex flex-col hover:shadow-lg transition-shadow min-w-[320px] max-w-xs w-full"
                  style={{ maxHeight: 320, overflow: 'hidden' }}
                >
                  <h2 className="text-xl font-bold mb-2 text-black line-clamp-2" style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} dangerouslySetInnerHTML={{ __html: post.title?.rendered || post.title }} />
                  {post.excerpt?.rendered && (
                    <div
                      className="text-gray-700 text-base mb-4 line-clamp-4"
                      style={{overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical'}}
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                  )}
                  <Link href={`/articoli/${post.slug}`} className="mt-auto text-cyan-600 font-semibold hover:underline">Leggi tutto</Link>
                </div>
              ))
            )}
          </div>
        </div>
        <style jsx>{`
          @keyframes scroll-x {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @media (max-width: 768px) {
            .min-w-max {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
