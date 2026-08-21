export interface Author {
  username: string;
  // TODO: extract author icon (maybe)
  authorUrl?: string;
}

export interface Media {
  images?: string[];
  audio?: string[];
  video?: string[];
}

export interface Article {
  siteId?: string;
  url: string;
  title: string;
  description: string;
  content?: string;
  author?: Author;
  media?: Media[];
  date: string;
  formattedDate?: string;
  timestamp?: number;
  source?: string;
  sourceType?: string;
}