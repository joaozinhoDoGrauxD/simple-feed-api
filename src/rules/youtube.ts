import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";

export function youtubeRule(item: CustomItem): Partial<Article> {
  const publisher =
    (item as { author?: string })?.author ||
    (item.creator ? item.creator : "");

  return {
    authors: publisher ? [{ name: publisher }] : undefined,
    published: item.pubDate || item.isoDate || "",
  };
}
