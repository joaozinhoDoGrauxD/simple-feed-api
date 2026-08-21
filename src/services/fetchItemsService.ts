import { fetchFeed } from "@/utils/functions/fetchFeed";
import { dateService } from "@/utils/functions/dates";
import Parser from "rss-parser";
import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";
import { getRuleForUrl } from "@/rules";

export type SortMode = "timestamp" | "source";

export const fetchItems = async (
  urls: string[],
  sort: SortMode = "timestamp"
): Promise<Article[] | Record<string, Article[]>> => {
  // Busca todos os feeds em paralelo sem travar se algum falhar
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const rule = getRuleForUrl(url);
      const ruleCustomFields = rule.customFields?.item || [];
      const customFields = [
        ["content:encoded", "content"],
        ["contentEncoded", "content"],
        ...ruleCustomFields,
      ];

      const parser = new Parser({
        customFields: { item: customFields },
      });

      const xml = await fetchFeed(url);
      const rss = await parser.parseString(xml);
      const items = rss.items as CustomItem[];

      return items.map((item) => {
        const rawDate = item.pubDate || item.isoDate || "";
        const timestamp = rawDate ? new Date(rawDate).getTime() : undefined;

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
          source: ruleApplied.source || "general",
          ...ruleApplied,
        };

        if (ruleApplied.content === undefined) {
          delete article.content;
        }

        return article;
      });
    })
  );

  // Filtra e junta os resultados obtidos com sucesso
  const allArticles: Article[] = results.flatMap((res) =>
    res.status === "fulfilled" ? res.value : []
  );

  // Formata as datas dos artigos extraídos
  const formattedArticles = dateService(allArticles);

  // Ordenação/Agrupamento baseado na preferência informada
  if (sort === "source") {
    return formattedArticles.reduce<Record<string, Article[]>>((acc, article) => {
      const groupKey = article.source || "general";
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(article);
      return acc;
    }, {});
  }

  // Padrão: Ordenação Cronológica (Decrescente por Timestamp)
  return formattedArticles.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
};