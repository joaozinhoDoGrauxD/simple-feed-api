import { contentCheck } from "../services/contentCheckService";
import { fetchItems } from "../services/fetchItemsService";
import type { Article } from "@/types/article.types";
import type { Request, Response } from "express";

export const rssContentController = async (req: Request, res: Response) => {
  const { urls, url }: { urls?: string[]; url?: string } = req.body;
  
  const targetUrls = urls || (url ? [url] : []);
  if (!Array.isArray(targetUrls) || targetUrls.length === 0) {
    return res.status(400).json({ message: "URL é obrigatória" });
  }

  try {
    const data = await fetchItems(targetUrls);

    let items: Article[] = [];
    if (Array.isArray(data)) {
      items = data;
    } else if (typeof data === "object" && data !== null) {
      items = Object.values(data).flat();
    }

    const checkedTypes = await contentCheck(items);

    res.set("Content-Type", "application/json; charset=utf-8");
    return res.status(200).json({ checkedTypes });
  } catch (error) {
    console.error("Express RSS Content Controller Error:", error);
    return res.status(500).json({ message: "Erro ao verificar conteúdo" });
  }
};
