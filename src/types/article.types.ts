export interface Article {
  title: string;
  description: string;
  content?: string;
  authors?: { name: string }[];
  published: string;
  timestamp?: number;
  enclosures?: { url: string }[];
  itunes?: { image?: string };
}
