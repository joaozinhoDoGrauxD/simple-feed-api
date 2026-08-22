import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";

export interface SiteRule {
  domain: string;
  // Campos customizados que o rss-parser deve procurar no XML para este site específico
  customFields?: { item: string[][] };
  transform: (item: CustomItem, channel?: any) => Partial<Article>;
}