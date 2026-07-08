import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";

export function defaultRule(item: CustomItem): Partial<Article> {
  return {
    authors: item.creator ? [{ name: item.creator }] : undefined,
    published: item.pubDate || item.isoDate || "",
  };
}