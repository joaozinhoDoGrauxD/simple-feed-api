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
  // pseudoId são apenas IDs para que o sistema possa ter um dado
  // unico para que se possa referir. Isto provavelmente nunca
  // será realmente usado, mais adicionei um para casos futuros.
  // 
  // a logica seria "{site}:{subcategoria}:{id-no-site}"
  pseudoId?: string;
  url: string;
  title: string;
  description: string;
  content?: string;
  author?: Author;
  media?: Media[];
  date: string;
  formattedDate?: string;
  timestamp?: number;
  website?: string;
  category?: string;
  subcategory?: string;
}