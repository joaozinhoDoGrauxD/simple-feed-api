import { checkFile } from "@/utils/checkFile";
import type { Request, Response } from "express";

export const rssContentController = async (req: Request, res: Response) => {
  const { url }: { url: string } = req.body;
  if (!url) {
    return res.status(400).json({ message: "URL é obrigatória" });
  }
  try {
    const fileType = await checkFile(url);
    return res.status(200).json({ type: fileType });
  } catch (error) {
    console.error("Express RSS Content Controller Error:", error);
    return res.status(500).json({ message: "Erro ao verificar conteúdo" });
  }
};
