import { formatPublishedDate } from "@/utils/formatDateService";
import type { Article } from "@/types/article.types";

export const dateService = (items: Article[]): Article[] => {
  items.forEach((item) => {
    item.published = formatPublishedDate(item.published);
  });
  return items;
};
