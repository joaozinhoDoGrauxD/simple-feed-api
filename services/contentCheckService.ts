import { checkFile } from "@/utils/checkFile";
import type { Article } from "@/types/article.types";

export const contentCheck = async (
  items: Article[] | undefined,
): Promise<Record<string, string>> => {
  const results: Record<string, string> = {};
  if (!items || items.length === 0) return results;

  // Extrair todos os arquivos únicos que precisam ser validados
  const allFiles = new Set<string>();
  for (const item of items) {
    const att = [
      item.description,
      item.enclosures?.[0]?.url,
      item.content,
      item.itunes?.image,
    ];
    for (const file of att) {
      if (file) {
        allFiles.add(file);
      }
    }
  }

  // Executar a checagem em paralelo para todos os arquivos únicos
  const filesArray = Array.from(allFiles);
  const checkPromises = filesArray.map(async (file) => {
    const type = await checkFile(file);
    return {
      file,
      type: typeof type === "string" ? type : String(type),
    };
  });

  const checkedResults = await Promise.all(checkPromises);
  for (const { file, type } of checkedResults) {
    results[file] = type;
  }

  return results;
};
