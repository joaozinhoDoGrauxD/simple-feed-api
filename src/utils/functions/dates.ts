import { formatPublishedDate } from "@/utils/functions/formatDate";
import type { Article } from "@/types/article.types";

export const dateService = (items: Article[]): Article[] => {
  items.forEach((item) => {
    const rawDate = item.date;
    if (rawDate) {
      const dateObj = new Date(rawDate);
      
      // Valida se a data retornada é válida
      if (!isNaN(dateObj.getTime())) {
        item.timestamp = dateObj.getTime();
        item.formattedDate = formatPublishedDate(item.timestamp);
      }
    }
  });
  
  return items;
};