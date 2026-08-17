import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";
import type { SiteRule } from "./types";

export const defaultRule: SiteRule = {
  domain: "default",
  transform: (item: CustomItem): Partial<Article> => {
    const images: string[] = [];
    
    // Antigo enclosure agora aceita apenas imagens e mapeia para a chave media.images
    if (item.enclosure?.url && item.enclosure.type?.startsWith('image/')) {
      images.push(item.enclosure.url);
    }

    return {
      author: item.creator ? { username: item.creator } : undefined,
      media: images.length > 0 ? [{ images }] : undefined,
      category: "general",
    };
  },
};