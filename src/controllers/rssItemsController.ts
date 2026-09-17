import { fetchItems, type SortMode } from "../services/fetchItemsService";
import type { Request, Response } from "express";

export const rssItemsController = async (req: Request, res: Response) => {
  const { urls, url, sort }: { urls?: string[]; url?: string; sort?: SortMode } = req.body;

  const targetUrls = urls || (url ? [url] : []);

  if (!Array.isArray(targetUrls) || targetUrls.length === 0) {
    return res.status(400).json({ message: "É necessário enviar ao menos uma URL em 'urls' ou 'url'" });
  }

  const sortMode: SortMode = sort === "source" ? "source" : "timestamp";

  try {
    const responseData = await fetchItems(targetUrls, sortMode);
    res.set("Content-Type", "application/json; charset=utf-8");
    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Express RSS Items Controller Error:", error);
    return res.status(500).json({ message: "Erro ao buscar os feeds RSS" });
  }
};