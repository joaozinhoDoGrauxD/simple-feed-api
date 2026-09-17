import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";
import type { SiteRule } from "./types";

export const defaultRule: SiteRule = {
  domain: "default",
  transform: (item: CustomItem): Partial<Article> => {
    const images: string[] = [];

    if (item.enclosure?.url && item.enclosure.type?.startsWith("image/")) {
      images.push(item.enclosure.url);
    }

    // Busca alternativa se o item não tiver a propriedade description padrão
    const fallbackDescription =
      item.description || (item as any).summary || item.content || undefined;

    return {
      author: item.creator ? { username: item.creator } : undefined,
      media: images.length > 0 ? [{ images }] : undefined,
      description: fallbackDescription,
      sourceType: "general",
    };
  },
};