import { youtubeRule } from "./youtube";
import { soundcloudRule } from "./soundcloud";
import { defaultRule } from "./default";
import type { Article } from "@/types/article.types";
import type { CustomItem } from "@/types/customItem.types";

type RuleFn = (item: CustomItem, rssChannel?: { title?: string }) => Partial<Article>;

const rules: Record<string, RuleFn> = {
  "youtube.com": youtubeRule,
  "soundcloud.com": soundcloudRule,
};

export function applyRule(
  item: CustomItem,
  website?: string,
  rssChannel?: { title?: string }
): Partial<Article> {
  if (!website) return defaultRule(item);

  const domain = Object.keys(rules).find((d) => website.includes(d));
  if (domain) {
    return rules[domain](item, rssChannel);
  }

  return defaultRule(item);
}
