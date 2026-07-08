export function extractWebsite(url: string): string {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace(/^www\./, ""); //será que a API deve fazer esta conversão ou o frontend que deve...?
    } catch {
      return "";
    }
}
  