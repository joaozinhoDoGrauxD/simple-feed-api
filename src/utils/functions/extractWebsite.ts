export function extractWebsite(url: string): string {
    try {
      const hostname = new URL(url).hostname;
      return hostname
    } catch (err) {
      return `Erro a extrair url: ${err}`;
    }
}
  