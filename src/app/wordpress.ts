import axios from "axios";

const WORDPRESS_API_URL = "https://nextjs.samyadeicolori.it/wp-json/wp/v2/posts";

export async function getLatestPosts() {
  try {
    const response = await axios.get(WORDPRESS_API_URL);
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dei post da WordPress:", error);
    return [];
  }
}
