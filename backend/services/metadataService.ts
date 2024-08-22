import axios from "axios";

export const fetchMetadata = async (url: string) => {
  try {
    // Fetch the HTML content
    const response = await axios.get(url);

    // Regular expressions extract
    const titleMatch = response.data.match(/<title>([^<]*)<\/title>/);
    const descriptionMatch = response.data.match(/<meta name="description" content="([^"]*)"/);
    const imageMatch = response.data.match(/<meta property="og:image" content="([^"]*)"/);
    return {
      title: titleMatch ? titleMatch[1] : "No title found",
      description: descriptionMatch ? descriptionMatch[1] : "No description found",
      image: imageMatch ? imageMatch[1] : "No image found",
    };
  } catch (error) {
    console.error(`Error fetching metadata from ${url}:`, error);
  }
};
