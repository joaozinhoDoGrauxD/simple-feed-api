import { youtubeRule } from "./youtube";
import { soundcloudRule } from "./soundcloud";
import { defaultRule } from "./default";
import type { SiteRule } from "./types";

const rulesList: SiteRule[] = [
  youtubeRule,
  soundcloudRule,
];

export function getRuleForUrl(url: string): SiteRule {
  if (!url) return defaultRule;

  const foundRule = rulesList.find((rule) =>
    url.toLowerCase().includes(rule.domain.toLowerCase())
  );

  return foundRule || defaultRule;
}