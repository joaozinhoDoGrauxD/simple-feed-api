import { checkFile } from "@/utils/functions/checkFile";
import type { Article } from "@/types/article.types";

export const contentCheck = async (
  items: Article[] | undefined,
): Promise<Record<string, string>> => {
  const results: Record<string, string> = {};
  if (!items || items.length === 0) return results;

  const allFiles = new Set<string>();
  for (const item of items) {
    // Checagens base
    if (item.description) allFiles.add(item.description);
    if (item.content) allFiles.add(item.content);

    // Iterando pelo novo array de medias
    if (item.media && item.media.length > 0) {
      for (const m of item.media) {
        if (m.images) m.images.forEach(img => allFiles.add(img));
        if (m.audio) m.audio.forEach(audio => allFiles.add(audio));
        if (m.video) m.video.forEach(video => allFiles.add(video));
      }
    }
  }

  // Filtra apenas o que parecer URL para testar os tipos
  const filesArray = Array.from(allFiles).filter(f => /^https?:\/\//i.test(f));
  
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