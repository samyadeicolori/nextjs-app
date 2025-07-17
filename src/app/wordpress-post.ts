import axios from "axios";

const WORDPRESS_API_URL = "https://nextjs.samyadeicolori.it/wp-json/wp/v2/posts";

export async function getPostBySlug(slug: string) {
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}?slug=${slug}`);
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error("Errore nel recupero del post:", error);
    return null;
  }
}
