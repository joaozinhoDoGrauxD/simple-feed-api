import { fetchFeed } from "@/utils/functions/fetchFeed";
import { dateService } from "@/utils/functions/dates";
import Parser from "rss-parser";
import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";
import { extractWebsite } from "@/utils/functions/extractWebsite";
import { applyRule } from "@/rules";

export const fetchItems = async (
  url: string,
): Promise<Article[] | undefined> => {
  try {
    const parser = new Parser({
      customFields: {
        item: [
          ["content:encoded", "content"],
          ["contentEncoded", "content"],
        ],
      },
    });
    const xml = await fetchFeed(url);
    const rss = await parser.parseString(xml);
    const items = rss.items as CustomItem[];
    const filteredItems: Article[] = items.map((item) => {
      const rawDate = item.pubDate || item.isoDate || "";
      const timestamp = rawDate ? new Date(rawDate).getTime() : undefined;
      const website = item.link ? extractWebsite(item.link) : undefined;

      const baseArticle: Article = {
        title: item.title || "",
        description: item.description || "",
        content: item.content,
        published: rawDate,
        timestamp,
        website,
        enclosures: item.enclosure?.url ? [{ url: item.enclosure.url }] : undefined,
        itunes: item.itunes as { image?: string } | undefined,
      };

      const ruleApplied = applyRule(item, website, { title: rss.title });

      return { ...baseArticle, ...ruleApplied };
    });
    
    return dateService(filteredItems);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
