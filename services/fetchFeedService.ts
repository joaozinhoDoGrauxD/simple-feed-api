import axios from "axios";
import iconv from "iconv-lite";

export const fetchFeed = async (myurl: string) => {
  const response = await axios.get(myurl, {
    responseType: "arraybuffer",
  });

  const contentType = String(response.headers["content-type"] || "");
  const match: any = contentType.match(/charset=([^;]+)/i);
  let charset = match ? match[1].toLowerCase().trim() : "utf-8";

  if (!match) {
    const head = response.data.slice(0, 200).toString("utf-8");
    const xmlMatch = head.match(/encoding=["'](.*?)["']/i);
    if (xmlMatch) {
      charset = xmlMatch[1].toLowerCase().trim();
    }
  }

  if (!iconv.encodingExists(charset)) {
    charset = "utf-8";
  }
  const data = iconv.decode(response.data, charset);
  return data;
};
