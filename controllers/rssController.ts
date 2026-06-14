import { fetchFeed } from "../services/fetchFeedService";
import { Request, Response } from "express";

export const rssController = async (req: Request, res: Response) => {

  const { url } : {url: string}  = req.body;
  try {
    const responseData = await fetchFeed(url);
    res.set("Content-Type", "text/xml; charset=utf-8");
    return res.status(200).send(responseData);
  } catch (error) {
    console.error("Express RSS Controller Error:", error);
    return res.status(500).json({ message: "Erro ao buscar o feed" });
  }
};
