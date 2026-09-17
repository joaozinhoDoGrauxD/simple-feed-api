export function sanitizeText(str: string): string {
    if (!str) return "";
  
    return (
      str
        // 1. Remove parâmetros de meta-dados de issues/comentários (ex: quote_id=0)
        .replace(/quote_id=\d+\s*/gi, "")
        // 2. Remove tags HTML (ex: <p dir="auto">, <code>, </div>)
        .replace(/<\/?[^>]+(>|$)/g, "")
        // 3. Substitui múltiplos \n ou \r por um único espaço/quebra limpa
        .replace(/[\r\n]+/g, " ")
        // 4. Decodifica entidades HTML comuns caso apareçam no feed
        .replace(/&#34;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        // 5. Remove espaços nas pontas e duplos espaços internos
        .replace(/\s+/g, " ")
        .trim()
    );
  }