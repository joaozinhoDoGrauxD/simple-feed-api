import Parser from "rss-parser";

// Permitimos indexação dinâmica pois os customFields podem injetar propriedades diversas

// TODO: re-add itunes later
export interface CustomItem extends Parser.Item {
  [key: string]: any; 
}