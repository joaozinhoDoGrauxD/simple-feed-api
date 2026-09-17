import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";
import type { SiteRule } from "./types";
import { sanitizeText } from "@/utils/functions/sanitizeText";

export const githubRule: SiteRule = {
  domain: "github.com",
  customFields: {
    item: [
      ["title", "title"],
      ["id", "id"],
      ["author", "author"],
    ],
  },
  transform: (item: CustomItem, channel?: any): Partial<Article> => {
    // 1. O título do feed principal (<feed><title>) vai para o título do artigo
    const title = sanitizeText(channel?.title ?? "GitHub Commits");

    // 2. O título da entrada (<entry><title>) vai para a descrição
    const cleanDescription = sanitizeText(item.title ?? "");

    // 3. Extrai o ID do commit (SHA de 40 caracteres) a partir do id ou link
    let siteId: string | undefined;
    
    // Tenta extrair a hash SHA do padrão: "tag:github.com,2008:Grit::Commit/86047cf67a12bdb6ff1085774f8ad9fc347e8da9"
    const rawId = item.id || item.guid || "";
    const commitMatch = rawId.match(/Commit\/([a-f0-9]{40})/i);

    if (commitMatch) {
      siteId = commitMatch[1];
    } else if (item.link) {
      // Fallback: extrai do final do URL do commit
      const urlParts = item.link.split("/commit/");
      if (urlParts[1]) {
        siteId = urlParts[1].split("#")[0]?.split("?")[0];
      }
    }

    // 4. Extrai o autor do commit
    let username = "";
    if (typeof item.author === "object" && item.author?.name) {
      username = item.author.name;
    } else if (typeof item.author === "string") {
      username = item.author;
    }

    const authorUrl = typeof item.author === "object" && item.author?.uri 
      ? item.author.uri 
      : username 
        ? `https://github.com/${username}` 
        : undefined;

    return {
      siteId,
      title,
      description: cleanDescription,
      content: undefined,
      author: username
        ? {
            username,
            authorUrl,
          }
        : undefined,
      source: "github",
      sourceType: "commit",
    };
  },
};