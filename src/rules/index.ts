import { youtubeRule } from "./youtube";
import { soundcloudRule } from "./soundcloud";
import { codebergRule } from "./codeberg";
import { defaultRule } from "./default";
import type { SiteRule } from "./types";
import { githubRule } from "./github";

const rulesList: SiteRule[] = [
  youtubeRule,
  soundcloudRule,
  codebergRule,
  githubRule,
];

export function getRuleForUrl(url: string): SiteRule {
  if (!url) return defaultRule;

  const foundRule = rulesList.find((rule) =>
    url.toLowerCase().includes(rule.domain.toLowerCase())
  );

  return foundRule || defaultRule;
}