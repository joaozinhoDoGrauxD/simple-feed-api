import { hasHTML, hasAudio, hasImage } from "@/utils/hasFile";
import { FileType } from "@/enums/FileEnums";
import axios from "axios";

export const checkFile = async (
  file: string | undefined,
): Promise<FileType | string | boolean> => {
  if (file !== undefined) {
    if (/^https?:\/\//i.test(file)) {
      try {
        const response = await axios.head(file, {
          timeout: 2000,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          },
        });
        const contentType = String(response.headers["content-type"] || "");
        if (contentType.startsWith("audio/")) {
          return FileType.Audio;
        }
        if (contentType.startsWith("image/")) {
          return FileType.Image;
        }
        if (contentType.startsWith("text/html")) {
          return FileType.HTML;
        }
      } catch {
        try {
          const response = await axios.get(file, {
            timeout: 2000,
            headers: {
              Range: "bytes=0-100",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
          });
          const contentType = String(response.headers["content-type"] || "");
          if (contentType.startsWith("audio/")) {
            return FileType.Audio;
          }
          if (contentType.startsWith("image/")) {
            return FileType.Image;
          }
          if (contentType.startsWith("text/html")) {
            return FileType.HTML;
          }
        } catch {
          // Fallback to regex
        }
      }
    }

    switch (true) {
      case hasHTML(file):
        return FileType.HTML;
      case hasAudio(file):
        return FileType.Audio;
      case hasImage(file):
        return FileType.Image;
      default:
        return "Unknown type of file";
    }
  }
  return false;
};
