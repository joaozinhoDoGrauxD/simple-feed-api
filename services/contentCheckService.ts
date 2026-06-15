import { checkFile } from "@/utils/checkFile";
import type { Article } from "@/types/article.types";

export const contentCheck = async (items: Article[]) => {
  for (const item of items) {
    const att = [
      item.description,
      item.enclosures?.[0]?.url,
      item.content,
      item.itunes?.image,
    ];
    for (const file of att) {
      await checkFile(file);
    }
  }
};
