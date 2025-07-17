export type Comment = {
  id: number;
  author_name: string;
  content: { rendered: string };
  date: string;
};
type AxiosError = {
  isAxiosError: boolean;
  response?: {
    data?: {
      message?: string;
    };
  };
};
export async function postComment({ post, author_name, author_email, content }: { post: number, author_name: string, author_email: string, content: string }) {
  try {
    const response = await axios.post(
      WORDPRESS_API_URL,
      {
        post,
        author_name,
        author_email,
        content,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Errore nell'invio del commento");
  }
}

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
}
import axios from "axios";

const WORDPRESS_API_URL = "https://nextjs.samyadeicolori.it/wp-json/wp/v2/comments";

export async function getCommentsByPostId(postId: number) {
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}?post=${postId}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Errore nel recupero dei commenti:", error);
    return [];
  }
}
