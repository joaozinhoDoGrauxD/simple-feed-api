import { fetchItems } from "../services/fetchItemsService";
import type { Request, Response } from "express";

export const rssItemsController = async (req: Request, res: Response) => {
  const { url }: { url: string } = req.body;
  if (!url) {
    return res.status(400).json({ message: "URL é obrigatória" });
  }
  try {
    const responseData = await fetchItems(url);
    res.set("Content-Type", "text/json; charset=utf-8");
    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Express RSS Items Controller Error:", error);
    return res.status(500).json({ message: "Erro ao buscar o feed" });
  }
};
