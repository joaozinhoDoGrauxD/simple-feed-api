import { fetchFeed } from "@/utils/functions/fetchFeed";
import { dateService } from "@/utils/functions/dates";
import Parser from "rss-parser";
import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";

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
    const filteredItems: Article[] = items.map(
      ({
        title,
        description,
        content,
        creator,
        pubDate,
        isoDate,
        enclosure,
        itunes,
      }) => {
        const authorName =
          creator || (itunes as { author?: string } | undefined)?.author || "";
        return {
          title: title || "",
          description: description || "",
          content,
          authors: authorName ? [{ name: authorName }] : undefined,
          published: pubDate || isoDate || "",
          enclosures:
            enclosure && enclosure.url ? [{ url: enclosure.url }] : undefined,
          itunes: itunes as { image?: string } | undefined,
        };
      },
    );
    return dateService(filteredItems);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
