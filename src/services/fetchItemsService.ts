import { fetchFeed } from "@/utils/functions/fetchFeed";
import { dateService } from "@/utils/functions/dates";
import Parser from "rss-parser";
import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";
import { extractWebsite } from "@/utils/functions/extractWebsite";
import { getRuleForWebsite } from "@/rules";

export const fetchItems = async (
  url: string,
): Promise<Article[] | undefined> => {
  try {
    const website = extractWebsite(url);
    const rule = getRuleForWebsite(website);

    const ruleCustomFields = rule.customFields?.item || [];
    const customFields = [
      ["content:encoded", "content"],
      ["contentEncoded", "content"],
      ...ruleCustomFields,
    ];

    const parser = new Parser({
      customFields: {
        item: customFields,
      },
    });

    const xml = await fetchFeed(url);
    const rss = await parser.parseString(xml);
    const items = rss.items as CustomItem[];

    const filteredItems: Article[] = items.map((item) => {
      const rawDate = item.pubDate || item.isoDate || "";
      const timestamp = rawDate ? new Date(rawDate).getTime() : undefined;
      const itemWebsite = item.link ? extractWebsite(item.link) : website;

      // Executa a transformação da regra
      const ruleApplied = rule.transform(item, {
        title: rss.title,
        "itunes:image": rss["itunes:image"],
      });

      const article: Article = {
        url: item.link || url,
        title: item.title || "",
        description: ruleApplied.description ?? item.description ?? "",
        content: ruleApplied.content !== undefined ? ruleApplied.content : item.content,
        date: rawDate,
        timestamp,
        website: itemWebsite,
        ...ruleApplied,
      };

      // Garante remoção do campo se a regra o definiu explicitamente como undefined
      if (ruleApplied.content === undefined) {
        delete article.content;
      }

      return article;
    });

    return dateService(filteredItems);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};