import axios from "axios";

const WORDPRESS_API_URL = "https://nextjs.samyadeicolori.it/wp-json";

export async function getSiteInfo() {
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero delle info del sito WordPress:", error);
    return null;
  }
}

export async function getSiteLogoUrl() {
  try {
    // Recupera le opzioni del tema per trovare il logo
    const res = await axios.get(`${WORDPRESS_API_URL}/wp/v2/settings`);
    const data = res.data as { site_logo?: string };
    return data.site_logo || null;
  } catch {
    return null;
  }
}
