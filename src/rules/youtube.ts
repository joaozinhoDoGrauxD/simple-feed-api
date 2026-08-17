// youtube rss is so outdated it doesn't even return the author handle lol

import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";
import type { SiteRule } from "./types";

export const youtubeRule: SiteRule = {
  domain: "youtube.com",
  customFields: {
    item: [
      ["yt:videoId", "videoId"],
      ["yt:channelId", "channelId"],
      ["author", "authorObj"],
      // Mantemos a chave "media:group" sem renomear para casar com a estrutura nativa do parser
      "media:group",
      ["media:group", "mediaGroup"],
    ],
  },
  transform: (item: CustomItem): Partial<Article> => {
    // Extração do Username/Author e Channel
    let username = "";
    const channelId = item.channelId || "";

    if (item.authorObj && typeof item.authorObj === "object") {
      username = item.authorObj.name || item.authorObj.name?.[0] || "";
    } else {
      username = item.author || item.creator || "";
    }

    // Extração da Descrição (media:group -> media:description)
    let description = "";

    // Pega o bloco media:group do item (tentando as duas variações de chave)
    const mediaGroup = item["media:group"] || item.mediaGroup;

    if (mediaGroup) {
      // O rss-parser coloca a subtag como 'media:description' ou 'description'
      const rawDesc = mediaGroup["media:description"] || mediaGroup.description;

      if (typeof rawDesc === "string") {
        description = rawDesc;
      } else if (Array.isArray(rawDesc)) {
        // Se vier como array de strings/objetos
        const first = rawDesc[0];
        description = typeof first === "string" ? first : first?._ || first?.["$"]?._ || "";
      } else if (rawDesc && typeof rawDesc === "object") {
        // Se vier como nó com texto em '_'
        description = rawDesc._ || rawDesc["$"]?._ || "";
      }
    }

    // Fallback caso a descrição não venha no media:group
    if (!description) {
      description = item.description || item.summary || "";
    }

    // Extração das Thumbnails
    const images: string[] = [];
    if (mediaGroup) {
      const rawThumb = mediaGroup["media:thumbnail"] || mediaGroup.thumbnail;
      if (rawThumb) {
        const thumbnails = Array.isArray(rawThumb) ? rawThumb : [rawThumb];
        for (const thumb of thumbnails) {
          if (thumb?.$?.url) {
            images.push(thumb.$.url);
          } else if (typeof thumb === "string") {
            images.push(thumb);
          }
        }
      }
    }

    return {
      pseudoId: item.videoId ? `youtube:video:${item.videoId}` : undefined,
      description,
      author: {
        username,
        authorUrl: channelId ? `https://www.youtube.com/channel/${channelId}` : undefined,
      },
      media: images.length > 0 ? [{ images }] : undefined,
      category: "youtube",
      subcategory: "video",
    };
  },
};