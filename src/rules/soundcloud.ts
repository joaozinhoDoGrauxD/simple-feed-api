import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";
import type { SiteRule } from "./types";

export const soundcloudRule: SiteRule = {
  domain: "soundcloud.com",
  customFields: {
    item: [
      ["itunes:image", "itunesImage"],
      ["itunes:summary", "itunesSummary"],
      ["itunes:author", "itunesAuthor"],
      ["itunes:duration", "duration"],
    ],
  },
  transform: (item: CustomItem, channel?: any): Partial<Article> => {
    const publisher = item.itunesAuthor || channel?.title || item.creator || "";

    // Pega o texto do summary/description e garante que o content seja ignorado
    const description = item.itunesSummary || item.description || item.content || "";

    const audioList: string[] = [];
    const imagesList: string[] = [];

    // Audio do enclosure
    if (item.enclosure?.url) {
      audioList.push(item.enclosure.url);
    }

    // Imagem do itunes:image no item ou no channel
    if (item.itunesImage?.$?.href) {
      imagesList.push(item.itunesImage.$.href);
    } else if (channel?.["itunes:image"]?.$?.href) {
      imagesList.push(channel["itunes:image"].$.href);
    }

    const mediaObj: Article["media"] = [];
    if (imagesList.length > 0 || audioList.length > 0) {
      mediaObj.push({
        ...(imagesList.length > 0 && { images: imagesList }),
        ...(audioList.length > 0 && { audio: audioList }),
      });
    }

    // Identificação do Track ID
    let trackId = "";
      if (item.guid) {
        const match = item.guid.match(/tracks\/(\d+)/);
        trackId = match ? match[1]! : item.guid;
      } else if (item.link) {
        trackId = item.link.split("/").pop() || "";
      }

    return {
      siteId: trackId ? `${trackId}` : undefined,
      description,
      content: undefined,
      author: publisher ? { username: publisher } : undefined,
      media: mediaObj.length > 0 ? mediaObj : undefined,
      source: "soundcloud",
      sourceType: "track",
    };
  },
};