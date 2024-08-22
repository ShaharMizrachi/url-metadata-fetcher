import { Request, Response } from "express";
import { fetchMetadata } from "../services/metadataService";

export const getMetadata = async (req: Request, res: Response): Promise<void> => {
  const { urls } = req.body;

  console.log(urls.length);
  if (!Array.isArray(urls) || urls.length < 3) {
    res.status(400).json({ error: "Invalid input, please provide an array with at least 3 URLs." });
    return;
  }
  try {
    const metadata = [];
    for (const url of urls) {
      const data = await fetchMetadata(url);
      metadata.push(data);
    }
    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: "Error fetching metadata" });
  }
};
