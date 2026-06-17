import Parser from "rss-parser";

export interface CustomItem extends Parser.Item {
  description?: string;
  itunes?: {
    image?: string;
    author?: string;
  };
}
