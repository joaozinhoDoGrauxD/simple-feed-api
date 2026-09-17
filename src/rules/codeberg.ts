import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";
import type { SiteRule } from "./types";
import { sanitizeText } from "@/utils/functions/sanitizeText";

function getSourceTypeFromTitle(title?: string): string {
  if (!title) return "issue";

  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("opened issue")) return "new issue";
  if (lowerTitle.includes("commented on")) return "comment";
  if (lowerTitle.includes("closed issue")) return "closed issue";
  if (lowerTitle.includes("reopened issue")) return "reopened issue";
  if (lowerTitle.includes("created pull request")) return "pull request";
  if (lowerTitle.includes("closed pull request")) return "closed pull request";
  if (lowerTitle.includes("merged pull request") || lowerTitle.includes("merged")) return "merged pull request";

  return "issue";
}

export const codebergRule: SiteRule = {
  domain: "codeberg.org",
  customFields: {
    item: [["author", "authorName"]],
  },
  transform: (item: CustomItem): Partial<Article> => {
    const rawText = item.content || item.description || "";
    let cleanDescription = sanitizeText(rawText);

    const issueMatch = cleanDescription.match(/^(\d+#)(.*)/);

    if (issueMatch) {
        //codeberg rss is not very clean
        const rawPrefix = issueMatch[1] ?? "";
        const numberPrefix = rawPrefix.replace("#", "# "); 
        let restOfText = issueMatch[2] ?? "";
        if (restOfText.endsWith("#")) {
          restOfText = restOfText.slice(0, -1);
        }
  
        cleanDescription = `${numberPrefix}${restOfText.trim()}`;
      }

    const sourceType = getSourceTypeFromTitle(item.title);

    let siteId: string | undefined;
    if (item.guid) {
      const match = item.guid.match(/^(\d+):/);
      siteId = match ? match[1] : item.guid.split("/").pop();
    }

    const authorName = item.authorName || item.creator || "";

    return {
      siteId,
      description: cleanDescription,
      content: undefined,
      author: authorName ? { username: authorName } : undefined,
      source: "codeberg",
      sourceType,
    };
  },
};