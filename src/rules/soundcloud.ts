import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";

export function soundcloudRule(
  item: CustomItem,
  rssChannel?: { title?: string }
): Partial<Article> {
  const publisher = rssChannel?.title || "";

  return {
    authors: publisher ? [{ name: publisher }] : undefined,
    published: item.pubDate || item.isoDate || "",
  };
}
