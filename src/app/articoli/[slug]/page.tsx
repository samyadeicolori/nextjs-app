"use client";

import Header from "../../Header";
import { useEffect, useState } from "react";
import { getPostBySlug } from "../../wordpress-post";
import { getCommentsByPostId, Comment } from "../../wordpress-comments";
import { useParams } from "next/navigation";

type Post = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  link?: string;
  content?: { rendered: string };
};

export default function Articolo() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      getPostBySlug(slug).then((data) => {
        setPost(data);
        setLoading(false);
        if (data?.id) {
          setCommentsLoading(true);
          getCommentsByPostId(data.id).then((comms) => {
            setComments(comms);
            setCommentsLoading(false);
          });
        }
      });
    }
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto mt-10 px-4">
        {!post && loading ? (
          <div className="animate-pulse">
            <div className="bg-white rounded-xl shadow p-8 mb-10">
              <div className="h-8 w-2/3 bg-gray-200 rounded mb-6" />
              <div className="h-6 w-full bg-gray-200 rounded mb-4" />
              <div className="h-6 w-5/6 bg-gray-200 rounded mb-4" />
              <div className="h-6 w-4/6 bg-gray-200 rounded" />
            </div>
          </div>
        ) : !post ? (
          <p className="text-gray-500">Articolo non trovato.</p>
        ) : (
          <>
            <article className="bg-white rounded-xl shadow p-8 mb-10">
              <h1 className="text-3xl font-bold mb-6 text-cyan-700" dangerouslySetInnerHTML={{ __html: post.title?.rendered || post.title }} />
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 w-full bg-gray-200 rounded mb-4" />
                  <div className="h-6 w-5/6 bg-gray-200 rounded mb-4" />
                  <div className="h-6 w-4/6 bg-gray-200 rounded" />
                </div>
              ) : (
                <div className="prose prose-lg max-w-none text-gray-900" style={{wordBreak: 'break-word'}} dangerouslySetInnerHTML={{ __html: post.content?.rendered || "" }} />
              )}
            </article>
            <section className="bg-white rounded-xl shadow p-8">
              <h2 className="text-2xl font-bold mb-4 text-cyan-700">Commenti</h2>
              {commentsLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 w-full bg-gray-200 rounded" />
                  <div className="h-6 w-5/6 bg-gray-200 rounded" />
                  <div className="h-6 w-4/6 bg-gray-200 rounded" />
                </div>
              ) : comments.length === 0 ? (
                <p className="text-gray-500">Nessun commento presente.</p>
              ) : (
                <ul className="space-y-6">
                  {comments.map(comment => (
                    <li key={comment.id} className="border-b pb-4">
                      <div className="font-semibold text-cyan-800 mb-1">{comment.author_name}</div>
                      <div className="text-gray-700 text-sm mb-1" dangerouslySetInnerHTML={{ __html: comment.content?.rendered || comment.content }} />
                      <div className="text-xs text-gray-400">{new Date(comment.date).toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
