import { youtubeRule } from "./youtube";
import { soundcloudRule } from "./soundcloud";
import { defaultRule } from "./default";
import type { SiteRule } from "./types";

const rulesList: SiteRule[] = [
  youtubeRule,
  soundcloudRule,
];

export function getRuleForWebsite(website?: string): SiteRule {
  if (!website) return defaultRule;

  // Normaliza e verifica se o domínio configurado faz parte do hostname extraído
  const foundRule = rulesList.find((rule) =>
    website.toLowerCase().includes(rule.domain.toLowerCase())
  );

  return foundRule || defaultRule;
}