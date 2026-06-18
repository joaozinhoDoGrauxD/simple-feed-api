export interface Article {
  title: string;
  description: string;
  content?: string;
  authors?: { name: string }[];
  published: string;
  enclosures?: { url: string }[];
  itunes?: { image?: string };
}
