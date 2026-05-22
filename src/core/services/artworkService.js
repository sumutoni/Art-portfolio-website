export async function fetchArtworks() {
  const response = await fetch("/data/artworks.json");
  if (!response.ok) {
    throw new Error("Failed to load artworks.");
  }
  return response.json();
}

export async function fetchArtworkBySlug(slug) {
  const artworks = await fetchArtworks();
  return artworks.find((item) => item.slug === slug) || artworks[0] || null;
}
